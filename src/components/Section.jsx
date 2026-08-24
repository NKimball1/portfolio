import Reveal from './Reveal.jsx'

/**
 * Shared section chrome: a hairline rule, a monospace eyebrow label with its
 * index, and a consistent max width. Keeps every section on the same rhythm.
 */
export default function Section({ id, eyebrow, index, title, children, className = '' }) {
  return (
    <section id={id} className={`border-t border-line px-6 py-24 md:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-wrap items-baseline gap-x-6 gap-y-3 md:mb-20">
          <span className="eyebrow">
            {index} / {eyebrow}
          </span>
          {title && (
            <h2 className="text-[length:var(--text-h2)] font-medium leading-[1.05] tracking-[-0.02em]">
              {title}
            </h2>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
