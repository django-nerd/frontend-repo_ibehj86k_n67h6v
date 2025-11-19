import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Sofia M.', role: 'Growth Lead, DTC', quote: 'Ascendia cut our CAC by 32% in 6 weeks. The hands-on frameworks are gold.' },
  { name: 'Andre F.', role: 'Paid Media Strategist', quote: 'The creative testing system alone paid for the course countless times.' },
  { name: 'Mina R.', role: 'Marketing Ops', quote: 'Finally made sense of GA4 + server-side tracking. Career-changing.' },
]

export default function Testimonials() {
  return (
    <section className="relative bg-black text-white px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">What learners say</h2>
          <p className="text-slate-400 mt-2">Real outcomes from real marketers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 reveal glow-responsive" data-parallax data-depth={(i===1?0.03:0.02).toString()}>
              <p className="text-slate-200">“{t.quote}”</p>
              <div className="mt-4 text-sm text-slate-400">{t.name} • {t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
