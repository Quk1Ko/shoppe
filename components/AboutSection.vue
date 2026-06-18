<template>
  <div class="about">
    <div class="about__top">
      <h1 class="about__title">About</h1>
      <h3 class="about__subtitle">Who we are and why we do what we do!</h3>
      <h5 class="about__text">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida
        arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna
        maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor
        lacus, ac sodales lectus placerat quis.
      </h5>
    </div>

    <div class="about__trend">
      <h2 class="about__trend-title">Top trends</h2>
      <img class="about__trend-image" src="/assets/images/Img-home-trend.png" alt="Trend image" />
      <h5 class="about__trend-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
        hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris
        eget arcu facilisis consequat sed eu felis.
      </h5>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .about {
    display: flex;
    flex-direction: column;
    gap: clamp(40px, 6vw, 90px);
    align-items: center;
    padding-top: clamp(40px, 6vw, 90px);
    padding-bottom: clamp(40px, 6vw, 90px);

    &__top {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 520px;
      text-align: center;
    }

    &__title {
      margin: 0 0 clamp(12px, 2vw, 24px);
    }

    &__subtitle {
      margin: 0 0 clamp(20px, 4vw, 46px);
    }

    &__text {
      width: 100%;
      margin: 0;
    }

    &__trend {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 520px;

      &__trend-title {
        margin: 0 0 clamp(12px, 2vw, 24px);
      }

      &-image {
        display: block;
        width: 100%;
        height: auto;
        margin-bottom: clamp(20px, 4vw, 48px);
        object-fit: cover;
        border-radius: 8px;
      }

      &-text {
        margin: 0;
      }
    }

    @media (width <= 768px) {
      gap: 40px;
      padding-top: 32px;
      padding-bottom: 32px;

      &__title {
        margin-bottom: 2px;
      }

      &__top {
        align-items: flex-start;
        text-align: left;
      }

      &__trend {
        max-width: 100%;
      }

      &__text,
      &__trend-text {
        height: 78px;
        overflow: hidden;
        text-overflow: clip;
      }
    }
  }
</style>
