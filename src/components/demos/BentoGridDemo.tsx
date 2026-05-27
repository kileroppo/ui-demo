export function BentoGridDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3" style={{ background: '#f8fafc' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '6px',
          width: '100%',
          maxWidth: '200px',
          height: '100px',
        }}
      >
        <div
          style={{
            background: '#E0E7FF',
            borderRadius: '10px',
            gridRow: 'span 2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-xs font-semibold text-indigo-600">Main</span>
        </div>
        <div
          style={{
            background: '#FCE7F3',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-xs font-semibold text-pink-600">Card</span>
        </div>
        <div
          style={{
            background: '#D1FAE5',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-xs font-semibold text-green-600">Info</span>
        </div>
      </div>
    </div>
  )
}
