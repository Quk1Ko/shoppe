<script setup lang="ts">
  import { ref } from 'vue'
  import { footerNavItems, socialLinks } from '~/constants/footer.constants'
  import BaseInput from '~/components/BaseInput.vue'
  import BaseNotification from '~/components/BaseNotification.vue'

  const newsletterEmail = ref('')
  const error = ref<string | null>(null)
  const checkboxChecked = ref(false)
  const showSuccess = ref(false)

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = () => {
    error.value = null

    if (!newsletterEmail.value.trim()) {
      error.value = 'Email is required'
      return
    }

    if (!isValidEmail(newsletterEmail.value)) {
      error.value = 'Please enter a valid email address'
      return
    }

    if (window.innerWidth < 768 && !checkboxChecked.value) {
      error.value = 'You must agree to the terms and conditions'
      return
    }

    const email = newsletterEmail.value.trim()
    let emails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]')

    if (!emails.includes(email)) {
      emails.push(email)
      localStorage.setItem('newsletterEmails', JSON.stringify(emails))
    }

    showSuccess.value = true
    newsletterEmail.value = ''
    checkboxChecked.value = false

    setTimeout(() => {
      showSuccess.value = false
    }, 4000)
  }
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__divider"></div>

      <div class="footer__mobile-top">
        <BaseInput
          v-model="newsletterEmail"
          :error="error"
          class="footer__input-mobile"
          :show-checkbox="true"
          :checkbox-checked="checkboxChecked"
          @update:checkbox-checked="checkboxChecked = $event"
          @submit="handleSubmit"
        />
      </div>

      <div class="footer__top">
        <nav class="footer__nav" aria-label="Footer navigation">
          <NuxtLink
            v-for="item in footerNavItems"
            :key="item.to"
            :to="item.to"
            class="footer__nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <BaseInput
          v-model="newsletterEmail"
          :error="error"
          class="footer__input"
          @submit="handleSubmit"
        />
      </div>

      <div class="footer__bottom">
        <h5 class="footer__copyright">
          <span class="footer__text-bold">© 2021 Shelly.</span>
          <NuxtLink to="/terms" class="footer__text-link"> Terms of use</NuxtLink>
          <span class="footer__text-bold"> and </span>
          <NuxtLink to="/" class="footer__text-link">privacy policy.</NuxtLink>
        </h5>

        <div class="footer__social-media">
          <a
            v-for="item in socialLinks"
            :key="item.aria"
            class="footer__social-link"
            :aria-label="item.aria"
          >
            <component :is="item.icon" />
          </a>
        </div>
      </div>

      <div class="footer__bottom-mobile">
        <div class="footer__social-media">
          <label class="footer__social-text">Follow us</label>
          <div class="footer__divider-mobile"></div>
          <a
            v-for="item in socialLinks"
            :key="item.aria"
            class="footer__social-link"
            :aria-label="item.aria"
          >
            <component :is="item.icon" />
          </a>
        </div>

        <div class="footer__copyright-mobile">
          <span class="footer__text-bold__mobile">© 2021 Shelly.</span>
          <NuxtLink to="/terms" class="footer__text-link"> Terms of use</NuxtLink>
          <span class="footer__text-bold__mobile"> and </span>
          <NuxtLink to="/" class="footer__text-link">privacy policy.</NuxtLink>
        </div>
      </div>

      <BaseNotification
        v-if="showSuccess"
        type="success"
        message="Email successfully saved!"
        closable
        @close="showSuccess = false"
      />
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    width: 100%;
    margin-bottom: 27px;
    font-family: var(--font-primary), sans-serif;
    color: var(--color-text);

    &__social-text {
      font-size: var(--body-medium-size);
      font-weight: var(--body-medium-weight);
      color: var(--color-black);
      text-decoration: none;
    }

    &__input {
      display: none;
      flex-direction: column;
      max-width: 389px;
    }

    &__divider {
      width: 100%;
      height: 1px;
      margin-bottom: 24px;
      background: var(--color-neutral-light-gray);

      &-mobile {
        width: 47px;
        height: 0;
        margin-top: auto;
        border-top: 2px solid var(--color-black);
      }
    }

    &__top {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 24px;
    }

    &__mobile-top {
      display: block;
      margin-bottom: 40px;
    }

    &__nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__nav-link,
    &__text-link {
      font-size: var(--body-medium-size);
      font-weight: var(--h5-weight);
      line-height: var(--h5-lh);
      color: var(--color-neutral-dark-gray);
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }

    &__bottom {
      display: none;

      &-mobile {
        display: flex;
        flex-direction: column;
        margin-top: 32px;
        font-size: var(--body-medium-size);
        font-weight: var(--body-medium-weight);
        color: var(--color-neutral-dark-gray);
      }
    }

    &__copyright {
      margin: 0;
      font-size: var(--h5-size);
      font-weight: var(--h5-weight);
      line-height: var(--h5-lh);
      color: var(--color-neutral-dark-gray);

      &-mobile {
        margin-top: 36px;
        color: var(--color-neutral-light-gray);
        text-decoration: none;
      }
    }

    &__text-bold {
      color: var(--color-black);

      &__mobile {
        color: var(--color-neutral-dark-gray);
      }
    }

    &__social-media {
      display: flex;
      gap: 16px;
      align-items: center;

      &-text {
        font-size: var(--body-medium-size);
        font-weight: var(--body-medium-weight);
        line-height: var(--h5-lh);
        color: var(--color-neutral-dark-gray);
      }
    }

    &__social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-neutral-dark-gray);
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }

    @media (min-width: $breakpoints-m) {
      margin-bottom: 106px;

      &__top {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      &__mobile-top {
        display: none;
      }

      &__nav {
        flex-flow: row wrap;
        gap: 28px;
      }

      &__nav-link,
      &__text-link {
        font-size: var(--h5-size);
      }

      &__input {
        display: flex;
        width: 100%;
      }

      &__bottom {
        display: flex;
        gap: 18px;
        align-items: center;
        justify-content: space-between;

        &-mobile {
          display: none;
        }
      }

      &__social-media {
        gap: 30px;
      }
    }
  }
</style>
