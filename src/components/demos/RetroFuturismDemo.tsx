export function RetroFuturismDemo() {
  return (
    <div
      className="w-full h-32 rounded-xl flex items-center justify-center overflow-hidden relative"
      style={{ background: '#1A1A2E' }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
        }}
      />
      <p
        className="font-mono text-sm font-bold relative z-10"
        style={{
          color: '#FF006E',
          textShadow: '0 0 10px #FF006E, 0 0 20px #FF006E',
        }}
      >
        NEON CRT
      </p>
    </div>
  )
}
