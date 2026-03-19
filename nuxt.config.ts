/*
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
});
*/

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  runtimeConfig: {
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost', 
        'Access-Control-Allow-Credentials': 'true', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization'
      }
    },
    '/auth/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost', 
        'Access-Control-Allow-Credentials': 'true', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization'
      }
    }
  }
});