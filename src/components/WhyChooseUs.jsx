import { motion } from 'framer-motion'
import { Star, Rocket, LineChart, ShieldCheck } from 'lucide-react'

const features = [
  { icon: Rocket, title: 'Built for Speed', desc: 'Action-first curriculum that gets you implementing fast.' },
  { icon: LineChart, title: 'Data-Driven', desc: 'Every playbook backed by analytics and experimentation.' },
  { icon: Star, title: 'Elite Mentors', desc: 'Join live sessions with leaders from top brands and agencies.' },
  { icon: ShieldCheck, title: 'Career Outcomes', desc: 'Portfolio-ready projects and hiring support.' },
]

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-gradient-to-b from-black to-[#0b0e13] text-white px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">Why choose Ascendia</h2>
          <p className="text-slate-400 mt-2">A premium learning experience designed for the modern growth leader.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
              className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <f.icon className="w-8 h-8 text-[#FFA559]" />
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
