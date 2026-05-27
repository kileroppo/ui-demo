export function VibrantBlockDemo() {
  return (
    <div className="w-full h-32 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-black rounded-xl overflow-hidden">
      <div className="flex items-center justify-center rounded" style={{ background: '#39FF14' }}>
        <span className="text-xs font-bold text-black">A</span>
      </div>
      <div className="flex items-center justify-center rounded" style={{ background: '#BF00FF' }}>
        <span className="text-xs font-bold text-white">B</span>
      </div>
      <div className="flex items-center justify-center rounded" style={{ background: '#FF1493' }}>
        <span className="text-xs font-bold text-white">C</span>
      </div>
      <div className="flex items-center justify-center rounded" style={{ background: '#00FFFF' }}>
        <span className="text-xs font-bold text-black">D</span>
      </div>
    </div>
  )
}
