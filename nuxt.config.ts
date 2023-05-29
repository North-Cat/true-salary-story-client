// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', '@vite-pwa/nuxt'],
  build: { transpile: ['yup', 'lodash', '@vee-validate/rules'] },
  runtimeConfig: {
    public: {
      apiBase: 'https://client-api-dev.up.railway.app',
    },
  },
  telemetry: false,
  css: ['@/assets/css/tailwind.css', '@/assets/css/style.css', '@/assets/css/icon.css'],
  sourcemap: {
    server: true,
    client: true,
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: '真薪話',
      short_name: '真薪話',
      description: '最真實的薪水行情 Web App',
      display: 'standalone',
      theme_color: '#366BAB',
      icons: [
        {
          src: 'pwa/pwa-icon-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'pwa/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: 'pwa/safari-pinned-tab.svg',
          type: 'svg',
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /.*\.(?:css|js)/,
          handler: 'NetworkFirst',
        },
      ],
      navigateFallback: '/',
      globPatterns: ['**/*.{js,ts,vue,css,html,png,svg,ico}'],
    },
    // TODO: Temp Test for PWA
    // client: {
    //   installPrompt: true,
    //   periodicSyncForUpdates: 20,
    // },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

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
