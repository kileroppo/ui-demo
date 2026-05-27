export function NeubrutalismDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#FDE68A' }}>
      <div
        style={{
          background: '#FBBF24',
          border: '3px solid #000000',
          boxShadow: '5px 5px 0px #000000',
          borderRadius: '4px',
          padding: '16px',
          maxWidth: '200px',
          width: '100%',
        }}
      >
        <h4 className="text-sm font-black text-black uppercase tracking-wide">
          Bold & Raw
        </h4>
        <p className="text-xs text-gray-800 mt-1">
          No subtlety here.
        </p>
        <button
          type="button"
          style={{
            marginTop: '8px',
            padding: '6px 12px',
            background: '#F472B6',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            borderRadius: '2px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#000000',
            textTransform: 'uppercase',
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  )
}
