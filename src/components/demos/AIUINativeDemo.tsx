export function AIUINativeDemo() {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81, #3730a3)',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '12px 16px',
          maxWidth: '180px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p className="text-xs text-indigo-200">AI Assistant</p>
        <div
          className="mt-2 rounded-lg px-3 py-2"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px 12px 4px 12px',
          }}
        >
          <p className="text-xs text-white">Hello! How can I help?</p>
        </div>
        <div className="flex gap-1 mt-2 ml-1" aria-label="typing indicator">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
