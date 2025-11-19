export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 px-6 md:px-12 py-10 border-t border-white/10" data-parallax data-depth="0.01">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Ascendia. All rights reserved.</div>
        <nav className="flex gap-6 text-sm">
          <a href="#courses" className="hover:text-white">Courses</a>
          <a href="#why" className="hover:text-white">Why Us</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
