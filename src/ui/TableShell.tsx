import type { ReactNode } from 'react'

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-auto rounded-[10px] border border-line bg-surface shadow-card">
      <table className="w-full min-w-[640px] border-collapse tabular-nums [&_tbody_tr:last-child>td]:border-b-0">{children}</table>
    </div>
  )
}
