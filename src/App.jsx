import { useEffect, useRef } from 'react'
import Hero from './components/Hero'
import FeaturedCourses from './components/FeaturedCourses'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import ContactPayment from './components/ContactPayment'
import Footer from './components/Footer'
import { initParallax } from './lib/parallax'

function App() {
  const contactRef = useRef(null)

  useEffect(() => {
    // initialize site-wide parallax and smooth inertia
    const cleanup = initParallax({ smooth: 0.12 })
    return () => cleanup && cleanup()
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const startCheckout = async (opts) => {
    const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    try {
      const res = await fetch(`${BACKEND}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: opts?.name || 'Ascendia Course', amount: opts?.amount || 9900 })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Checkout error')
      window.location.href = data.url
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Parallax background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-60">
        <div data-parallax data-depth="-0.02" data-z="0" className="absolute inset-0"
             style={{background:
               'radial-gradient(circle_at_20%_20%,#27374D33,transparent_40%),radial-gradient(circle_at_80%_40%,#49557933,transparent_40%),radial-gradient(circle_at_50%_80%,#FFA55922,transparent_40%)'}} />
      </div>

      <Hero onCTAClick={scrollToContact} />
      <FeaturedCourses onCheckout={startCheckout} />
      <WhyChooseUs />
      <Testimonials />
      <ContactPayment ref={contactRef} />
      <Footer />
    </div>
  )
}

export default App
