export function AuroraDemo() {
  return (
    <div
      className="w-full h-32 rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0080FF, #8B00FF, #FF1493, #00FFFF)',
        backgroundSize: '200% 200%',
        animation: 'aurora 4s ease infinite',
      }}
    >
      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <p className="text-white text-sm font-medium drop-shadow-lg">
        Aurora Flow
      </p>
    </div>
  )
}
