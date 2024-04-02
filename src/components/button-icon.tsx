import { ComponentProps, ElementType } from "react"
import { VariantProps, tv } from 'tailwind-variants'


const button = tv({
  base: 'disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 rounded-md p-1.5',

  variants: {
    variant: {
      default: 'bg-white/10',
      dark: 'bg-black/20'
    }
  },

  defaultVariants: {
    variant: 'default'
  }

})


interface ButtonIconProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  icon: ElementType
}

export const ButtonIcon = ({ icon: Icon, className, variant, ...props }: ButtonIconProps) => {
  return (
    <button {...props} className={button({ variant, className })}>
      <Icon className="size-4" />
    </button>
  )
}