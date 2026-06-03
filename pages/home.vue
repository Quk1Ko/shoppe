<script setup lang="ts">
  import HomeSlider from '~/components/HomeSlider.vue'
</script>
<template>
  <div class="home">
    <div class="home__slider">
      <HomeSlider />
    </div>

    <h1>Home page</h1>
  </div>
</template>
<style lang="scss" scoped>
  .home {
    align-items: center;
    justify-content: center;
    max-width: 346px;
    margin-top: 16px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: $breakpoints-m) {
      gap: 40px;
      max-width: 696px;
      height: 84px;
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
