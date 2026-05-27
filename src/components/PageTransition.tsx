interface Props {
  children: React.ReactNode
  className?: string
  transitionKey: string
}

export function PageTransition({ children, className = '', transitionKey }: Props) {
  return (
    <div key={transitionKey} className={`animate-fade-in-up ${className}`}>
      {children}
    </div>
  )
}
