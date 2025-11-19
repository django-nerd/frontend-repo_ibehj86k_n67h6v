import { useState } from 'react'

export default function ContactPayment() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'landing' })
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('Thanks! We will get back to you shortly.')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again later.')
    }
  }

  const checkout = async () => {
    setStatus('Creating checkout...')
    try {
      const res = await fetch(`${BACKEND}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Ascendia: Performance Marketing Masterclass', amount: 9900 })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Checkout error')
      window.location.href = data.url
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <section id="contact" className="relative bg-gradient-to-b from-[#0b0e13] to-black text-white px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Get in touch</h2>
          <p className="text-slate-400 mt-2">Questions about the curriculum, cohorts, or team training? Drop us a note.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <input required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFA559]" />
            <input required type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} placeholder="Email"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFA559]" />
            <textarea required rows="5" value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} placeholder="Message"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFA559]" />
            <div className="flex gap-3">
              <button type="submit" className="rounded-xl bg-[#FFA559] text-black font-semibold px-6 py-3 hover:shadow-[0_0_35px_#FFA55955]">Send</button>
              <button type="button" onClick={checkout} className="rounded-xl border border-white/15 px-6 py-3 hover:bg-white/5">Quick Enroll $99</button>
            </div>
          </form>

          {status && <div className="mt-4 text-sm text-slate-300">{status}</div>}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-lg">What’s inside Ascendia</h3>
          <ul className="mt-4 space-y-3 text-slate-300 text-sm">
            <li>• On-demand lessons + live workshops</li>
            <li>• Templates: testing plans, briefs, dashboards</li>
            <li>• Private community and job board</li>
            <li>• Certificates and portfolio projects</li>
          </ul>
          <div className="mt-6 rounded-2xl p-4 bg-[#27374D]/30 border border-white/10 text-slate-200">
            Secure checkout powered by Stripe
          </div>
        </div>
      </div>
    </section>
  )
}
