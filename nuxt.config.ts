// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
    css: ['~/assets/scss/app.scss'],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    }
})