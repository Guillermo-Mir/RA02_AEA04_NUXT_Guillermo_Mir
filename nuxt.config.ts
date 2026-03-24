export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  
  // Configuración limpia y nativa de Nuxt 3 para CORS
  routeRules: {
    '/**': { 
      cors: true,
      headers: { 
        'Access-Control-Allow-Origin': 'http://localhost:9000', 
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type'
      } 
    }
  },

  runtimeConfig: {
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
});