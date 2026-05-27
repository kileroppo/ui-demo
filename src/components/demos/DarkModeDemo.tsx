export function DarkModeDemo() {
  return (
    <div
      className="w-full h-32 rounded-xl flex items-center justify-center"
      style={{ background: '#000000' }}
    >
      <div className="text-center">
        <p
          className="text-sm font-medium"
          style={{
            color: '#39FF14',
            textShadow: '0 0 10px #39FF14',
          }}
        >
          OLED Dark
        </p>
        <p className="text-xs mt-1" style={{ color: '#0080FF' }}>
          Power Efficient
        </p>
      </div>
    </div>
  )
}
