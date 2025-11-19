// Lightweight, GPU-accelerated parallax + smooth animation engine
// - Single RAF loop
// - Transform-only (translate3d/translateZ)
// - Works across the whole page via data attributes
//
// Usage:
//  - Add data-parallax to any element and set data-depth (e.g., 0.02, -0.05)
//  - Optional: data-axis="x|y" (default y)
//  - Optional: data-z for translateZ composition (visual depth only)
//  - Add class "glow-responsive" to elements that should slightly change brightness on scroll
//  - Add class "reveal" to elements for enter-viewport micro-animations
//
// This engine never triggers layout: it only writes to style.transform and CSS variables.

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

export function initParallax({ smooth = 0.12 } = {}) {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) smooth = 1 // disable inertia, follow scroll directly

  const state = {
    rafId: null,
    targetY: 0,
    currentY: 0,
    lastY: 0,
    velocity: 0,
    ticking: false,
    elements: [],
    glowEls: [],
    observer: null,
  }

  const query = () => {
    state.elements = Array.from(document.querySelectorAll('[data-parallax]')).map((el) => ({
      el,
      depth: parseFloat(el.getAttribute('data-depth') || '0.05'),
      axis: el.getAttribute('data-axis') || 'y',
      z: parseFloat(el.getAttribute('data-z') || '0')
    }))
    state.glowEls = Array.from(document.querySelectorAll('.glow-responsive'))
  }

  // IntersectionObserver for micro-animations
  const setupRevealObserver = () => {
    if (state.observer) state.observer.disconnect()
    state.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('inview')
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 })

    document.querySelectorAll('.reveal').forEach((el) => state.observer.observe(el))
  }

  const onScroll = () => {
    state.targetY = window.scrollY || window.pageYOffset || 0
    if (!state.ticking) {
      state.ticking = true
      state.rafId = requestAnimationFrame(update)
    }
  }

  let lastTime = performance.now()
  const update = () => {
    const now = performance.now()
    const dt = clamp((now - lastTime) / 1000, 0.001, 0.05)
    lastTime = now

    // Ease currentY towards targetY for inertia effect (smooth==1 means direct follow)
    state.currentY += (state.targetY - state.currentY) * smooth

    // Velocity estimate for subtle glow response
    const v = (state.currentY - state.lastY) / dt
    state.velocity = v
    state.lastY = state.currentY

    // Write CSS vars globally for optional use
    const root = document.documentElement
    root.style.setProperty('--scrollY', state.currentY.toFixed(2))
    root.style.setProperty('--scrollVel', v.toFixed(2))

    // Apply parallax transforms
    for (const item of state.elements) {
      const offset = state.currentY * item.depth
      if (item.axis === 'y') {
        item.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, ${item.z}px)`
      } else {
        item.el.style.transform = `translate3d(${offset.toFixed(2)}px, 0, ${item.z}px)`
      }
      item.el.style.willChange = 'transform'
    }

    // Subtle glow based on velocity (clamped)
    const glowIntensity = 1 + clamp(Math.abs(v) / 4000, 0, 0.25)
    for (const g of state.glowEls) {
      g.style.setProperty('--glow-brightness', glowIntensity.toFixed(3))
      g.style.setProperty('--glow-strength', clamp(0.45 + Math.abs(v) / 8000, 0.45, 0.9).toFixed(3))
    }

    // Continue loop if not very close to target to save CPU
    if (Math.abs(state.targetY - state.currentY) > 0.1) {
      state.rafId = requestAnimationFrame(update)
    } else {
      state.ticking = false
      state.rafId = null
    }
  }

  const onResize = () => {
    // Re-query to pick up new elements if layout changes
    query()
    setupRevealObserver()
    onScroll()
  }

  // Init
  query()
  setupRevealObserver()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  // Kick
  onScroll()

  return () => {
    cancelAnimationFrame(state.rafId)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (state.observer) state.observer.disconnect()
  }
}
