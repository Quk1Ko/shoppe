<script setup lang="ts">
  import IconNotificationCheck from '~/assets/icons/IconNotificationCheck.vue'
  import IconCross from '~/assets/icons/IconCross.vue'
  import { useBreakpoints } from '~/composables/useBreakpoints'

  withDefaults(
    defineProps<{
      type?: 'success' | 'error' | 'info'
      message: string
      closable?: boolean
    }>(),
    {
      type: 'success',
      closable: false,
    },
  )

  const emit = defineEmits<{
    close: []
  }>()

  const { isDesktop } = useBreakpoints()
</script>

<template>
  <div
    class="base-notification"
    :class="[
      `base-notification--${type}`,
      isDesktop ? 'base-notification--desktop' : 'base-notification--mobile',
    ]"
  >
    <div class="base-notification__content">
      <div class="base-notification__icon">
        <IconNotificationCheck />
      </div>

      <p class="base-notification__message">
        {{ message }}
      </p>
    </div>

    <BaseButton
      v-if="closable"
      type="transparent"
      class="base-notification__close"
      @click="emit('close')"
    >
      <IconCross />
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
  .base-notification {
    position: fixed;
    left: 50%;
    z-index: 1000;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 32px);
    max-width: 1216px;
    padding: 16px 20px;
    color: #1f1f1f;
    background: #f3f1ee;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgb(0 0 0 / 12%);
    transform: translateX(-50%);
    animation: slideUp 0.3s ease;

    &__content {
      display: flex;
      gap: 12px;
      align-items: center;
      min-width: 0;
    }

    &__icon {
      flex: 0 0 auto;
      width: 20px;
      height: 20px;
      color: #a18a68;
    }

    &__message {
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
    }

    &__close {
      flex: 0 0 auto;
      width: 14px;
      height: 14px;
      padding: 0;
      color: #a18a68;
    }

    &--desktop {
      top: 24px;
    }

    &--mobile {
      top: 16px;
      max-width: 300px;
      padding: 14px 16px;

      .base-notification__message {
        font-size: 14px;
      }
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
</style>
