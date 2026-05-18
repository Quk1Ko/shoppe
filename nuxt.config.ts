// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // future: {
  //   compatibilityVersion: 3
  // },

  typescript: {
    typeCheck: false, // Временно отключаем строгую проверку при сборке
    shim: false,
  },

  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/scss/app.scss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
})
