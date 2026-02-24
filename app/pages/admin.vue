<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { data } = useFetch("/api/admin", {
  lazy: true
});
</script>
<template>
  <UCard class="flex justify-center">
      <UButton as-child>
        <NuxtLink to="/createPokemon">Crear POKEMON</NuxtLink>
      </UButton>
       <UButton as-child>
        <NuxtLink to="/pokemons">Veure POKEMONS</NuxtLink>
      </UButton>
  </UCard>
</template>
