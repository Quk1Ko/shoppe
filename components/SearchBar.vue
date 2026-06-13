<script setup lang="ts">
  import LensIcon from '~/assets/icons/IconLens.vue'
</script>
<template>
  <label class="mobile-menu__search">
    <LensIcon class="mobile-menu__search-icon" />
    <input type="text" placeholder="Search" />
  </label>
</template>

<style scoped>
  .mobile-menu__search {
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
</style>
