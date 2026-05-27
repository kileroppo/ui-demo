export function NeumorphismDemo() {
  return (
    <div className="w-full h-32 rounded-xl flex items-center justify-center"
      style={{ background: '#e8e8e8' }}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-xs text-gray-600 font-medium"
        style={{
          background: '#e8e8e8',
          boxShadow: '-5px -5px 15px rgba(255,255,255,0.8), 5px 5px 15px rgba(0,0,0,0.1)',
        }}
      >
        Soft UI
      </div>
    </div>
  )
}
