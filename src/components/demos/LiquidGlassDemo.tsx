export function LiquidGlassDemo() {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe)',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          maxWidth: '180px',
          width: '100%',
        }}
      >
        <h4 className="text-sm font-semibold text-white">Liquid Glass</h4>
        <p className="text-xs text-white/70 mt-1">Iridescent surface</p>
        <div
          className="mt-2 h-1 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #ff0080, #7928ca, #00d4ff, #ff0080)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
