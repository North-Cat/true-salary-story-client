// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/style.css',
    '@/assets/css/icon.css',
  ],
});
