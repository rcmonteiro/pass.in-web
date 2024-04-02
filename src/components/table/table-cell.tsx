import { ComponentProps, ReactNode } from "react"
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'td'> {
  children?: ReactNode
  className?: string
}

export const TableCell = ({ children, className, ...props}: TableCellProps) => {
  return (
    <td className={twMerge('text-zinc-300 px-4 py-3 text-sm', className)} {...props}>
      {children}
    </td>
  )
}