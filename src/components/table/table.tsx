import { ComponentProps, ReactNode } from "react"

interface TableProps extends ComponentProps<'table'> {
  children: ReactNode
}

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <div className=" border border-white/10 rounded-lg">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  )
}