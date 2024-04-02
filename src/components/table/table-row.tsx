import { ComponentProps, ReactNode } from "react"

interface TableRowProps extends ComponentProps<'tr'> {
  children: ReactNode
}

export const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5">
      {children}
    </tr>
  )
}