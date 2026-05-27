export function FlatDesignDemo() {
  return (
    <div className="w-full h-32 flex items-center justify-center gap-2 bg-white rounded-xl">
      <div className="w-10 h-10 rounded flex items-center justify-center"
        style={{ background: '#E74C3C' }}>
        <span className="text-white text-xs font-bold">1</span>
      </div>
      <div className="w-10 h-10 rounded flex items-center justify-center"
        style={{ background: '#3498DB' }}>
        <span className="text-white text-xs font-bold">2</span>
      </div>
      <div className="w-10 h-10 rounded flex items-center justify-center"
        style={{ background: '#2ECC71' }}>
        <span className="text-white text-xs font-bold">3</span>
      </div>
    </div>
  )
}
