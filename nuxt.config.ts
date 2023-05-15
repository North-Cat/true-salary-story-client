// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  build: { transpile: ['yup', 'lodash', '@vee-validate/rules'] },
  runtimeConfig: {
    public: {
      apiBase: 'https://client-api-dev.up.railway.app',
    },
  },
  css: ['@/assets/css/tailwind.css', '@/assets/css/style.css', '@/assets/css/icon.css'],

  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: 'https://client-api-dev.up.railway.app', // 这里是接口地址
  //       changeOrigin: true,
  //       prependPath: true,
  //     },
  //   },
  // },
});
