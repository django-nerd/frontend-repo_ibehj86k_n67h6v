import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const TAGLINES = [
  'Master Performance Marketing',
  'Automate. Optimize. Scale.',
  'AI-Powered Growth Playbooks',
  'From Clicks to Clients',
]

export default function Hero({ onCTAClick }) {
  const [tagIndex, setTagIndex] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.6])
  const glow = useTransform(scrollYProgress, [0, 1], [0.4, 0.9])

  useEffect(() => {
    const id = setInterval(() => setTagIndex((i) => (i + 1) % TAGLINES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[110vh] overflow-hidden bg-black text-white">
      {/* Gradient and grid overlays for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(39,55,77,0.35),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
      </div>

      {/* 3D Spline Scene */}
      <motion.div style={{ y, opacity }} className="relative h-[70vh] md:h-[80vh]">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Headline and CTA layer */}
      <motion.div style={{ y }} className="relative z-10 -mt-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Ascendia
              <span className="block text-[#FFA559] drop-shadow-[0_0_25px_rgba(255,165,89,0.45)]">Digital Marketing Academy</span>
            </motion.h1>

            <div className="mt-4 h-8 md:h-10 overflow-hidden">
              <motion.div key={tagIndex} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-20,opacity:0}} transition={{duration:0.5}}
                className="text-slate-300 text-lg md:text-xl font-medium">
                {TAGLINES[tagIndex]}
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={onCTAClick}
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-black font-semibold bg-[#FFA559] hover:shadow-[0_0_35px_#FFA55955] transition-shadow">
                <span>Explore Courses</span>
                <span className="h-2 w-2 rounded-full bg-black/60 group-hover:scale-125 transition-transform" />
              </button>
              <a href="#why" className="px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/5">Why Ascendia</a>
            </div>

            <div className="mt-6 text-sm text-slate-400 max-w-md">
              Learn performance marketing, analytics, and creative strategy with hands-on, project-based courses.
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-3xl" style={{boxShadow:`0 0 80px rgba(73,85,121,${glow.get()})`}} />
              <div className="relative grid grid-cols-2 gap-4 text-sm text-slate-200">
                {["Meta Ads", "Google Ads", "Attribution", "GA4", "SEO", "CRO", "Email", "Automation"].map((k)=> (
                  <div key={k} className="rounded-lg border border-white/10 bg-[#27374D]/30 px-3 py-2 text-center">
                    {k}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
