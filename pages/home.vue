<script setup lang="ts">
  import SearchBar from '~/components/SearchBar.vue'
  import HomeSlider from '~/components/HomeSlider.vue'
  import AboutSection from '~/components/AboutSection.vue'
</script>
<template>
  <div class="home">
    <div class="home__slider">
      <SearchBar class="home__search" />
      <HomeSlider />
      <AboutSection />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .home {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    max-width: 346px;
    padding-inline: 16px;
    margin: 16px auto 0;

    &__slider {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    @media (min-width: $breakpoints-m) {
      max-width: 696px;
      padding-inline: 24px;
      margin-bottom: 60px;

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
