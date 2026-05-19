<script setup lang="ts">
  import { ref } from 'vue'
  import LogoIcon from '@/assets/icons/Shoppe.vue'
  import LensIcon from '@/assets/icons/IconLens.vue'
  import CartIcon from '@/assets/icons/IconCart.vue'
  import ProfileIcon from '@/assets/icons/IconProfile.vue'
  import CloseIcon from '@/assets/icons/IconCross.vue'
  import IconGroupIcon from '@/assets/icons/IconGroup.vue'
  import OutIcon from '@/assets/icons/IconOut.vue'

  const isMobileMenuOpen = ref(false)

  const navItems = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/story' },
  ]

  const iconItems = [
    { icon: LensIcon, aria: 'Поиск' },
    { icon: CartIcon, aria: 'Корзина' },
    { icon: ProfileIcon, aria: 'Профиль' },
  ]

  const mobileMenuItems = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/story' },
    { label: 'Contact', to: '/contact' },
    { label: 'Terms Of Services', to: '/terms' },
    { label: 'Shipping And Returns', to: '/shipping-returns' },
  ]

  const mobileMenuBottomItems = [
    { label: 'My account', to: '/account', icon: ProfileIcon },
    { label: 'Logout', to: '/logout', icon: OutIcon },
  ]

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <a class="header__logo" href="/">
        <LogoIcon />
      </a>
      <nav class="header__nav">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="header__nav-link">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header__divider"></div>

      <div class="header__icons">
        <button
          v-for="item in iconItems"
          :key="item.aria"
          :aria-label="item.aria"
          class="header__icon"
          type="button"
        >
          <component :is="item.icon" />
        </button>
      </div>

      <div class="header__mobile-actions">
        <button class="header__mobile-action" type="button" aria-label="Корзина">
          <CartIcon />
        </button>

        <button
          class="header__mobile-action"
          type="button"
          aria-label="Открыть меню"
          @click="toggleMobileMenu"
        >
          <IconGroupIcon />
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu__backdrop" @click="closeMobileMenu"></div>

        <div class="mobile-menu__panel">
          <div class="mobile-menu__top">
            <a class="mobile-menu__logo" href="/" @click="closeMobileMenu">
              <LogoIcon />
            </a>
            <button
              class="mobile-menu__icon"
              type="button"
              aria-label="Закрыть"
              @click="closeMobileMenu"
            >
              <CloseIcon />
            </button>
          </div>

          <label class="mobile-menu__search">
            <LensIcon class="mobile-menu__search-icon" />
            <input type="text" placeholder="Search" />
          </label>

          <nav class="mobile-menu__nav">
            <NuxtLink
              v-for="item in mobileMenuItems"
              :key="item.to"
              :to="item.to"
              class="mobile-menu__link"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="mobile-menu__divider"></div>

          <div class="mobile-menu__bottom">
            <NuxtLink
              v-for="item in mobileMenuBottomItems"
              :key="item.to"
              :to="item.to"
              class="mobile-menu__bottom-link"
              @click="closeMobileMenu"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span class="mobile-menu__link">{{ item.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
  // @use '@/assets/scss/variables' as *;
  .header {
    width: 100%;
    font-family: var(--font-primary), sans-serif;
    background: var(--color-white);
    border-bottom: 1px solid #e9e3db;

    &__container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      width: 96%;
      max-width: 346px;
      height: 64px;
      padding: 0 16px;
      margin: 0 auto;
    }

    &__logo {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
    }

    &__nav,
    &__divider,
    &__icons {
      display: none;
    }

    &__mobile-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    &__icon,
    &__mobile-action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      cursor: pointer;
      background: none;
      border: none;

      &:hover {
        background: rgb(0 0 0 / 5%);
        border-radius: 8px;
      }

      &:active {
        transform: scale(0.95);
      }
    }

    @media (min-width: $breakpoints-m) {
      &__container {
        gap: 40px;
        max-width: 696px;
        height: 84px;
        padding: 0 36px;
      }

      &__nav {
        display: flex;
        flex: 1 1 auto;
        gap: 28px;
        align-items: center;
        justify-content: flex-end;
      }

      &__nav-link {
        font-size: var(--h5-size);
        font-weight: var(--h5-weight);
        line-height: var(--h5-lh);
        color: var(--color-text);
        text-decoration: none;

        &:hover {
          color: var(--color-primary);
        }
      }

      &__divider {
        display: block;
        flex: 0 0 auto;
        width: 2px;
        height: 22px;
        background: #bdb7b0;
      }

      &__icons {
        display: flex;
        gap: 22px;
        align-items: center;
      }

      &__mobile-actions {
        display: none;
      }
    }

    @media (min-width: $breakpoints-l) {
      &__container {
        max-width: 936px;
        padding: 0 36px;
      }
    }

    @media (min-width: $breakpoints-xl) {
      &__container {
        max-width: 1216px;
        padding: 0 112px;
      }
    }

    @media (min-width: $breakpoints-xxl) {
      &__container {
        max-width: 1680px;
        padding: 0 120px;
      }
    }
  }

  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 50;
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    line-height: var(--h1-lh);
    color: var(--color-text);

    &__backdrop {
      position: absolute;
      inset: 0;
      background: rgb(0 0 0 / 40%);
    }

    &__panel {
      position: absolute;
      inset: 12px;
      z-index: 1;
      padding: 18px 16px 24px;
      overflow-y: auto;
      background: #fff;
      border-radius: 18px;
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }

    &__logo {
      display: flex;
      align-items: center;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      cursor: pointer;
      background: none;
      border: none;
    }

    &__search {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 12px 14px;
      margin-bottom: 24px;
      background: #f3f3f3;
      border-radius: 8px;

      input {
        width: 100%;
        font-size: 16px;
        outline: none;
        background: transparent;
        border: none;
      }
    }

    &__nav {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__link {
      font-size: 20px;
      color: #111;
      text-decoration: none;
    }

    &__divider {
      height: 1px;
      margin: 28px 0;
      background: #e8e0d8;
    }

    &__bottom {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    &__bottom-link {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 18px;
      color: #111;
      text-decoration: none;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
