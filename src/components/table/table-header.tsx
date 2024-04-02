import { ComponentProps, ReactNode } from "react"

interface TableHeaderProps extends ComponentProps<'th'> {
  children?: ReactNode
}

export const TableHeader = ({ children, ...props}: TableHeaderProps) => {
  return (
    <th className="text-left px-4 py-3 text-sm font-semibold" {...props}>
      {children}
    </th>
  )
}