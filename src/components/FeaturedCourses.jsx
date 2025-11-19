import { motion } from 'framer-motion'

const courses = [
  {
    title: 'Performance Marketing Mastery',
    badge: 'Most Popular',
    desc: 'Full-funnel ads strategy across Meta, Google, TikTok. Budget scaling, testing frameworks, and creative systems.',
    color: '#27374D'
  },
  {
    title: 'Analytics & Attribution (GA4 + MTA)',
    badge: 'New',
    desc: 'Make confident decisions with clean tracking. Implement GA4, server-side tracking, and model attribution.',
    color: '#495579'
  },
  {
    title: 'CRO & Landing Page Strategy',
    badge: 'Advanced',
    desc: 'Turn clicks into customers with high-converting UX, persuasive copy, and experimentation workflows.',
    color: '#FFA559'
  }
]

export default function FeaturedCourses({ onCheckout }) {
  return (
    <section id="courses" className="relative bg-black text-white px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">Featured Courses</h2>
          <p className="text-slate-400 mt-2">Premium, project-based learning designed for career acceleration.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="absolute inset-0" style={{background:`radial-gradient(circle at 30% -10%, ${c.color}33, transparent 60%)`}} />
              <div className="relative p-6 flex flex-col h-full">
                <div className="text-xs uppercase tracking-wider text-white/70">Ascendia Course</div>
                <h3 className="text-xl font-bold mt-2">{c.title}</h3>
                <span className="mt-2 inline-block text-xs text-black font-semibold bg-[#FFA559] px-2 py-1 rounded-full w-fit">{c.badge}</span>
                <p className="text-slate-300 mt-4 text-sm leading-relaxed">{c.desc}</p>
                <div className="mt-auto pt-6">
                  <button onClick={() => onCheckout({ name: c.title, amount: 9900 })}
                    className="w-full rounded-xl bg-[#FFA559] text-black font-semibold py-3 hover:shadow-[0_0_35px_#FFA55955] transition-shadow">Enroll - $99</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
