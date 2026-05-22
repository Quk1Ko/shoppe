<script setup lang="ts">
  import { ref } from 'vue'
  import LogoIcon from '@/assets/icons/Shoppe.vue'
  import IconGroupIcon from '@/assets/icons/IconGroup.vue'
  import CartIcon from '@/assets/icons/IconCart.vue'
  import MobileMenu from './MobileMenu.vue'
  import { navItems, iconItems } from './header.constants'

  const isMobileMenuOpen = ref(false)

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
    <MobileMenu :is-open="isMobileMenuOpen" @close="closeMobileMenu" />
  </header>
</template>

<style lang="scss" scoped>
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
      }
    }

    @media (min-width: $breakpoints-xl) {
      &__container {
        max-width: 1216px;
      }
    }

    @media (min-width: $breakpoints-xxl) {
      &__container {
        max-width: 1680px;
      }
    }
  }
</style>
