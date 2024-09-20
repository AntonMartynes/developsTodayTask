// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/styles/main.scss",
    "~/assets/styles/themes.scss",
  ],
  modules: ["nuxt-quasar-ui", "@nuxt/image"],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
  build: {
    transpile: ["quasar"],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
  quasar: {
    sassVariables: "~/assets/styles/quasar.variables.scss",
    plugins: ["Notify", "Dialog"],
    extras: {
      fontIcons: ["material-icons"],
    },
  },
});
