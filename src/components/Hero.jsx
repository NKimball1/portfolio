import Reveal from './Reveal.jsx'
import { profile, stats } from '../data/content.js'

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
      {/* Soft amber bloom behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.location}
          </span>
          <span className="font-mono text-xs tracking-[0.16em] text-faint uppercase">
            {profile.availability}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-[length:var(--text-display)] font-light leading-[0.92] tracking-[-0.045em]">
            {profile.name.split(' ')[0]}
            <br />
            <span className="text-muted">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </Reveal>

        <Reveal delay={160} className="mt-10 max-w-3xl border-l border-line pl-6 md:mt-14 md:pl-8">
          <p className="mb-5 font-mono text-sm tracking-[0.12em] text-accent uppercase">
            {profile.role}
          </p>
          <p className="text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
            {profile.lede}
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-14 flex flex-wrap items-center gap-4 md:mt-20">
          <a
            href="#work"
            className="rounded-full bg-text px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
          >
            See the work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-line px-6 py-3 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </Reveal>

        {/* Numbers band — the fastest read on the page. */}
        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-12 md:mt-32 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 90}>
              <p className="mb-2 text-4xl font-light tracking-tight text-text md:text-5xl">
                {stat.value}
              </p>
              <p className="max-w-[14rem] text-sm leading-snug text-faint">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
