import type { LinkProps } from '@tanstack/react-router'

export interface NavItem {
  title: string
  linkOptions: LinkProps
  icon?: LucideIcon | null
}
