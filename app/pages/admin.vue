<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { data } = useFetch("/api/admin", {
  lazy: true
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
    <UCard class="w-full max-w-md border border-gray-200 shadow-md rounded-xl bg-white p-6">
      
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-6 tracking-tight">
        Panell d'Administració
      </h2>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <UButton as-child class="w-full sm:w-auto justify-center bg-gray-900 hover:bg-black text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200">
          <NuxtLink to="/createPokemon">Crear POKEMON</NuxtLink>
        </UButton>
        
        <UButton as-child class="w-full sm:w-auto justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors duration-200">
          <NuxtLink to="/pokemons">Veure POKEMONS</NuxtLink>
        </UButton>
      </div>

    </UCard>
  </div>
</template>