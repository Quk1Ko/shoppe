<script setup lang="ts">
  interface Props {
    type?: 'transparent' | 'primary' | 'secondary'
    nativeType?: 'button' | 'submit' | 'reset'
  }

  withDefaults(defineProps<Props>(), {
    type: 'transparent',
    nativeType: 'button',
  })
</script>
<template>
  <button :type="nativeType" class="base-button" :class="`base-button--${type}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .base-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-family: var(--font-primary), sans-serif;
    cursor: pointer;
    background: none;
    border: none;
    transition:
      background-color 0.2s,
      transform 0.1s;

    &--transparent {
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
  }
</style>
