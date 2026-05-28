interface Props {
  id: string
  title: string
  description: string
  onDismiss: () => void
}

export function OnboardingTooltip({ id, title, description, onDismiss }: Props) {
  return (
    <div
      className="absolute z-50 mt-2 w-64 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      role="tooltip"
      data-testid={`onboarding-tooltip-${id}`}
    >
      {/* Arrow */}
      <div className="absolute -top-2 left-6 w-4 h-4 rotate-45 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700" />
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <button
        onClick={onDismiss}
        className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
      >
        知道了
      </button>
    </div>
  )
}
