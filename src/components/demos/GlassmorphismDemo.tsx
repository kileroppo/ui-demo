export function GlassmorphismDemo() {
  return (
    <div
      className="relative w-full h-32 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div
        className="absolute inset-4 rounded-lg flex items-center justify-center text-white text-sm font-medium"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        Frosted Glass
      </div>
    </div>
  )
}
