import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
