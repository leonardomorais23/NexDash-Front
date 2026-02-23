export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    'shadcn-nuxt',
  ],
  shadcn: {
    /**
     * @default "Ui"
     */
    prefix: '',
    /**
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
   pinia: {
    storesDirs:['./app/stores/**']
  },
  future: {
    compatibilityVersion: 4,
  },
  routeRules: {
    '/': { redirect: '/login'}
  }
})