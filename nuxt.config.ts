export default defineNuxtConfig({
  ssr: false,
  css: [
    "primevue/resources/themes/viva-dark/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "~/assets/styles/main.scss",
  ],
  build: {
    transpile: ["primevue"],
  },
  runtimeConfig: {
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @import "./assets/styles/variables.scss";
            `,
        },
      },
    },
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
  },
  experimental: {
    payloadExtraction: false,
  },
});
