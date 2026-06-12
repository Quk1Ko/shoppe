<script setup lang="ts">
  import HomeSlider from '~/components/HomeSlider.vue'
</script>
<template>
  <div class="home">
    <div class="home__slider">
      <SearchBar class="home__search" />
      <HomeSlider />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .home {
    max-width: 346px;
    padding-inline: 16px;
    margin: 16px auto 0;

    &__search {
      display: flex;
    }

    @media (min-width: $breakpoints-m) {
      gap: 40px;
      max-width: 696px;
      height: 84px;
      padding-inline: 24px;

      &__search {
        display: none;
      }
    }

    @media (min-width: $breakpoints-l) {
      max-width: 936px;
    }

    @media (min-width: $breakpoints-xl) {
      max-width: 1216px;
    }

    @media (min-width: $breakpoints-xxl) {
      max-width: 1680px;
    }
  }
</style>
