import { useState } from 'react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { work } from '../data/content.js'

/**
 * One project row. Collapsed it shows the headline and a one-paragraph
 * summary; expanded it adds the "how it actually worked" detail. Keeps the
 * section scannable without hiding the interesting part behind a click.
 */
function WorkItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const panelId = `work-detail-${index}`

  return (
    <Reveal
      as="article"
      delay={index * 60}
      className="group border-b border-line py-10 first:border-t md:py-12"
    >
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        {/* Left rail: index, org, year */}
        <div className="flex items-start gap-4 md:col-span-3 md:flex-col md:gap-2">
          <span className="font-mono text-xs text-faint">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-1.5">
            <span
              className={`font-mono text-xs tracking-[0.12em] uppercase ${
                item.featured ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.org}
            </span>
            <span className="font-mono text-xs text-faint">{item.year}</span>
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.625rem] tracking-wide text-faint uppercase">
              {item.kind}
            </span>
          </div>
        </div>

        {/* Right: title, summary, tags, expand */}
        <div className="md:col-span-9">
          <h3 className="mb-4 text-2xl font-normal leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent md:text-3xl">
            {item.title}
          </h3>

          <p className="max-w-2xl text-base leading-relaxed text-muted">{item.summary}</p>

          {/* Expanded detail */}
          <div
            id={panelId}
            hidden={!open}
            className="mt-5 max-w-2xl border-l border-accent-dim pl-5 text-base leading-relaxed text-muted"
          >
            {item.detail}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="font-mono text-xs tracking-[0.12em] text-faint uppercase transition-colors hover:text-text"
            >
              {open ? '— Less' : '+ How it worked'}
            </button>

            {(item.links ?? []).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline font-mono text-xs tracking-[0.12em] text-accent uppercase"
              >
                {link.label} ↗
              </a>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-raised px-3 py-1 text-xs text-faint transition-colors group-hover:text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

export default function Work() {
  return (
    <Section id="work" index="01" eyebrow="Selected work" title="Things I've shipped">
      <div>
        {work.map((item, i) => (
          <WorkItem key={item.title} item={item} index={i} />
        ))}
      </div>

      <Reveal className="mt-10 max-w-2xl text-sm leading-relaxed text-faint">
        Client work is described at the level of architecture and outcome — the code and customer
        names stay where they belong. The personal projects are open, and the links go straight to
        the source.
      </Reveal>
    </Section>
  )
}
