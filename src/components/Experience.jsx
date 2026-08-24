import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { experience } from '../data/content.js'

export default function Experience() {
  return (
    <Section id="experience" index="03" eyebrow="Experience" title="Where I've been">
      <div>
        {experience.map((job, i) => (
          <Reveal
            key={`${job.org}-${job.period}`}
            as="article"
            delay={i * 70}
            className="grid gap-4 border-b border-line py-10 first:border-t md:grid-cols-12 md:gap-10 md:py-12"
          >
            <div className="md:col-span-3">
              <p className="font-mono text-xs tracking-[0.1em] text-faint uppercase">
                {job.period}
              </p>
            </div>

            <div className="md:col-span-9">
              <h3 className="text-xl font-normal tracking-[-0.01em] md:text-2xl">
                {job.role}
                {job.org && <span className="text-muted"> · {job.org}</span>}
              </h3>

              {job.note && <p className="mt-2 text-sm text-faint">{job.note}</p>}

              {job.points.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {job.points.map((point, j) => (
                    <li
                      key={j}
                      className="relative max-w-2xl pl-6 text-base leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-line"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
