import Reveal from './Reveal.jsx'
import { profile } from '../data/content.js'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: 'NKimball1', href: profile.github },
  { label: 'LinkedIn', value: 'Nicholas Kimball', href: profile.linkedin },
  { label: 'Résumé', value: 'PDF', href: profile.resume },
]

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 md:mb-20">
          <span className="eyebrow">04 / Contact</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="max-w-4xl text-[length:var(--text-h2)] font-light leading-[1.05] tracking-[-0.03em]">
            Got a problem that doesn't fit neatly in a ticket?{' '}
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-accent"
            >
              Let's talk about it.
            </a>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-12 md:grid-cols-4">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 70}>
              <p className="eyebrow mb-3">{channel.label}</p>
              <a
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="link-underline text-base text-text transition-colors hover:text-accent"
              >
                {channel.value}
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-24 flex flex-col gap-3 border-t border-line pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">{profile.location} · {profile.availability}</p>
        </footer>
      </div>
    </section>
  )
}
