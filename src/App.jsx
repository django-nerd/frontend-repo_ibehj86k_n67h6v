import { useRef } from 'react'
import Hero from './components/Hero'
import FeaturedCourses from './components/FeaturedCourses'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import ContactPayment from './components/ContactPayment'
import Footer from './components/Footer'

function App() {
  const contactRef = useRef(null)

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
      {/* Subtle background decorations */}
      <div className="pointer-events-none fixed inset-0 opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#27374D33,transparent_40%),radial-gradient(circle_at_80%_40%,#49557933,transparent_40%),radial-gradient(circle_at_50%_80%,#FFA55922,transparent_40%)]" />
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
