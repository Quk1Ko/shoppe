<template>
  <div class="product-filters">
    <div class="product-filters__block"></div>
  </div>
</template>

<style lang="scss" scoped>
  .product-filters {
    width: 100%;

    &__block {
      width: 100%;
      min-height: 520px;
      background: var(--color-neutral-light-gray);
      border-radius: 12px;
    }

    @media (max-width: $breakpoints-m) {
      &__block {
        min-height: 100vh;
      }
    }
  }
</style>
