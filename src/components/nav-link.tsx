import { ComponentProps, ReactNode } from "react"

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
}

export const NavLink = ({ children, ...props }: NavLinkProps) => {
  return (
    <a {...props} className='font-medium text-sm text-zinc-300'>{children}</a>
  )
}