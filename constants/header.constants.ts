import LensIcon from '~/assets/icons/IconLens.vue'
import ProfileIcon from '~/assets/icons/IconProfile.vue'
import OutIcon from '~/assets/icons/IconOut.vue'
import CartIcon from '~/assets/icons/IconCart.vue'

export const navItems = [
  { label: 'Shop', to: '/shop' },
  { label: 'Blog', to: '/blog' },
  { label: 'Our Story', to: '/story' },
]

export const iconItems = [
  { icon: LensIcon, aria: 'Поиск' },
  { icon: CartIcon, aria: 'Корзина' },
  { icon: ProfileIcon, aria: 'Профиль' },
]

export const mobileMenuItems = [
  { label: 'Shop', to: '/shop' },
  { label: 'Blog', to: '/blog' },
  { label: 'Our Story', to: '/story' },
  { label: 'Contact', to: '/contact' },
  { label: 'Terms Of Services', to: '/terms' },
  { label: 'Shipping And Returns', to: '/shipping-returns' },
]

export const mobileMenuBottomItems = [
  { label: 'My account', to: '/account', icon: ProfileIcon },
  { label: 'Logout', to: '/logout', icon: OutIcon },
]
