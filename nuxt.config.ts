// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    css: [
        '@/assets/css/tailwind.css', 
        '@/assets/css/style.css'
    ]
})
