<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const toast = useToast()

const { data: pokemons, refresh } = await useFetch('/api/pokemons')

async function deletePokemon(id: number) {
  await $fetch('/api/pokemons', {
    method: 'DELETE',
    body: { id }
  })
  toast.add({ title: 'Pokémon eliminat', color: 'red' })
  refresh()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">

      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost"
        class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 px-3 py-2 -ml-3">
        Tornar a l'Administració
      </UButton>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
            Els meus Pokémons
          </h1>
          <p class="text-sm text-gray-500 mt-1">Gestiona el teu equip Pokémon</p>
        </div>

        <UButton to="/createPokemon" icon="i-heroicons-plus"
          class="bg-gray-900 hover:bg-black text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-200">
          Nou Pokémon
        </UButton>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="pokemon in pokemons" :key="pokemon.id"
          class="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">

          <div class="p-5 flex-1">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                {{ pokemon.name }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-2 text-xs">
              <span class="px-2.5 py-1 rounded-md bg-gray-900 text-white font-medium tracking-wide shadow-sm">
                {{ pokemon.type }}
              </span>
              <span class="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 font-medium border border-gray-200">
                Gen {{ pokemon.generation }}
              </span>
            </div>
          </div>

          <div class="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <UButton
              class="flex-1 justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg shadow-sm transition-colors text-sm font-medium"
              :to="`/editPokemon?id=${pokemon.id}`">
              Modifica
            </UButton>

            <UButton icon="i-heroicons-trash"
              class="bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              @click="deletePokemon(pokemon.id)">
            </UButton>
          </div>
        </UCard>
      </div>

      <div v-if="!pokemons?.length"
        class="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed mt-8">
        <p class="text-gray-500 text-lg font-medium">
          No tens cap Pokémon encara.
        </p>
        <p class="text-gray-400 text-sm mt-1 mb-6">Crea el teu primer Pokémon per començar el teu equip.</p>
      </div>

    </div>
  </div>
</template>