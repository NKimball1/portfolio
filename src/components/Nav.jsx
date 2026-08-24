import { useEffect, useState } from 'react'
import { profile, navLinks } from '../data/content.js'

/**
 * Sticky top bar. Transparent over the hero, then picks up a blurred
 * background and a hairline border once the page scrolls.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-text transition-colors hover:text-accent"
        >
          NK<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-sm text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-4 py-1.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            Résumé
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="font-mono text-sm text-muted transition-colors hover:text-text md:hidden"
        >
          {open ? 'close' : 'menu'}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line bg-ink px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="text-lg text-accent"
            >
              Résumé →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
