import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { about, skills } from '../data/content.js'

export default function About() {
  return (
    <Section id="about" index="02" eyebrow="About" title="How I work">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          {about.map((para, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="mb-7 max-w-2xl text-lg leading-relaxed text-muted last:mb-0">{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-5 md:pl-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-1">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 70}>
                <h3 className="eyebrow mb-4">{group.group}</h3>
                <ul className="flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
