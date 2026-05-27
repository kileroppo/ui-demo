export function CyberpunkDemo() {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: '#0a0a0a',
      }}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.03) 2px, rgba(0,255,100,0.03) 4px)',
        }}
        aria-hidden="true"
      />
      <div className="text-center relative z-10">
        <p
          className="text-xs font-mono"
          style={{
            color: '#00ff9f',
            textShadow: '0 0 8px #00ff9f, 0 0 16px #00ff9f',
          }}
        >
          {'> SYSTEM ONLINE'}
        </p>
        <h4
          className="text-sm font-bold font-mono mt-1"
          style={{
            color: '#00e5ff',
            textShadow: '0 0 6px #00e5ff',
          }}
        >
          CYBER//PUNK
        </h4>
        <p
          className="text-xs font-mono mt-1"
          style={{ color: '#666666' }}
        >
          v2.0.77
        </p>
      </div>
    </div>
  )
}
