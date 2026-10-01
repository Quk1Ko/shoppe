<script setup lang="ts">
  import IconFacebook from '~/assets/icons/IconFacebook.vue'
  import IconInstagram from '~/assets/icons/IconInstagram.vue'
  import IconTwitter from '~/assets/icons/IconTwitter.vue'
  import IconLetter from '~/assets/icons/IconLetter.vue'

  const socials = [
    { icon: IconLetter, label: 'Email', name: 'email' },
    { icon: IconFacebook, label: 'Facebook', name: 'facebook' },
    { icon: IconInstagram, label: 'Instagram', name: 'instagram' },
    { icon: IconTwitter, label: 'Twitter', name: 'twitter' },
  ] as const

  defineEmits<{
    share: [platform: string]
  }>()
</script>

<template>
  <div class="product-socials">
    <BaseButton
      v-for="{ icon: Icon, label, name } in socials"
      :key="name"
      type="transparent"
      :aria-label="label"
      @click="$emit('share', name)"
    >
      <component :is="Icon" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
  .product-socials {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 28px;

    :deep(.base-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      font-size: 16px;
      line-height: 1;
      color: var(--color-neutral-dark-gray);
      transition: color 0.2s;

      &:hover {
        color: var(--color-black);
        background: transparent;
        border-radius: 0;
      }
    }
  }
</style>
