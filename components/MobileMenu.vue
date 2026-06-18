<script setup lang="ts">
  import LogoIcon from '@/assets/icons/Shoppe.vue'
  import CloseIcon from '~/assets/icons/IconCross.vue'
  import { mobileMenuItems, mobileMenuBottomItems } from '~/constants/header.constants'
  import SearchBar from '@/components/SearchBar.vue'

  defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()
</script>
<template>
  <Transition name="fade">
    <div v-if="isOpen" class="mobile-menu">
      <div class="mobile-menu__backdrop" @click="emit('close')"></div>

      <div class="mobile-menu__panel">
        <div class="mobile-menu__top">
          <a class="mobile-menu__logo" href="/" @click="emit('close')">
            <LogoIcon />
          </a>
          <BaseButton type="transparent" aria-label="Закрыть" @click="emit('close')">
            <CloseIcon />
          </BaseButton>
        </div>

        <SearchBar />

        <nav class="mobile-menu__nav">
          <NuxtLink
            v-for="item in mobileMenuItems"
            :key="item.to"
            :to="item.to"
            class="mobile-menu__link"
            @click="emit('close')"
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
            @click="emit('close')"
          >
            <component :is="item.icon" v-if="item.icon" />
            <span class="mobile-menu__link">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
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
