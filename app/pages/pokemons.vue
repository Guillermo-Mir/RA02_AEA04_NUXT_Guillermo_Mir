<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const toast = useToast()

const { data: pokemons, refresh } = await useFetch('/api/pokemons')

async function deletePokemon(id: number) {
  await $fetch('/api/pokemons', {
    method: 'DELETE',
    body: { id }
  })
  toast.add({ title: 'Pokémon eliminat', color: 'error' })
  refresh()
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Els meus Pokémons</h1>
      <UButton to="/createPokemon" icon="i-heroicons-plus">
        Nou Pokémon
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard v-for="pokemon in pokemons" :key="pokemon.id">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg">{{ pokemon.name }}</h3>
            <p class="text-gray-500">Tipus: {{ pokemon.type }}</p>
            <p class="text-gray-500">Generació: {{ pokemon.generation }}</p>
          </div>
          <UButton
            size="xs"
            icon="i-heroicons-pencil"
            color="warning"
            :to="`/editPokemon?id=${pokemon.id}`"
            />
          <UButton 
            size="xs" 
            icon="i-heroicons-trash" 
            color="error" 
            @click="deletePokemon(pokemon.id)" 
          />
        </div>
      </UCard>
    </div>

    <p v-if="!pokemons?.length" class="text-center text-gray-400 mt-10">
      No tens cap Pokémon encara. Crea el primer!
    </p>
  </div>
</template>