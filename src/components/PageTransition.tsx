import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  transitionKey: string
}

export function PageTransition({ children, className = '', transitionKey }: Props) {
  const [animating, setAnimating] = useState(false)
  const prevKeyRef = useRef(transitionKey)

  useEffect(() => {
    if (prevKeyRef.current !== transitionKey) {
      prevKeyRef.current = transitionKey
      setAnimating(true)
      const timer = setTimeout(() => setAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [transitionKey])

  return (
    <div className={`${animating ? 'animate-fade-in-up' : ''} ${className}`}>
      {children}
    </div>
  )
}
