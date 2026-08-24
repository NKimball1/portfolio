import { useEffect, useRef, useState } from 'react'

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. The actual motion lives in `.reveal` / `.is-visible` in index.css,
 * which also short-circuits the whole effect under prefers-reduced-motion.
 *
 * @param {number} delay - stagger in ms, for revealing a list one item at a time
 * @param {string} as    - element to render (defaults to a div)
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or an ancient browser): just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // reveal once; don't re-hide on scroll back up
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
