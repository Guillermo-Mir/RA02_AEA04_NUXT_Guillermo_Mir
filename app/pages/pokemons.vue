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
  <div class="min-h-screen bg-white-50 py-10 px-4">
    <div class="max-w-5xl mx-auto">

      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-red-600 tracking-tight">
          Els meus Pokémons
        </h1>

        <UButton to="/createPokemon" icon="i-heroicons-plus"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition">
          Nou Pokémon
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="pokemon in pokemons" :key="pokemon.id"
          class="group relative overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
          
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 to-red-600 opacity-80"></div>

          <div class="flex flex-col gap-4">
            <div class="text-left">
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-red-600 transition">
                {{ pokemon.name }}
              </h3>

              <div class="flex flex-wrap gap-2 mt-1 text-sm">
                <span class="px-3 py-1 rounded-full bg-red-50 text-red-600 font-medium">
                  {{ pokemon.type }}
                </span>

                <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                  Gen {{ pokemon.generation }}
                </span>
              </div>
            </div>

            <div class="flex gap-2">
              <UButton
                class="bg-white border border-red-200 text-red-500 hover:bg-red-50 rounded-lg shadow-sm"
                :to="`/editPokemon?id=${pokemon.id}`">
                Modifica
              </UButton>

              <UButton
                icon="i-heroicons-trash"
                class="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm cursor-pointer"
                @click="deletePokemon(pokemon.id)">
              </UButton>
            </div>
          </div>

        </UCard>
      </div>

      <p v-if="!pokemons?.length" class="text-center text-red-300 mt-14 text-lg font-medium">
        No tens cap Pokémon encara. Crea el primer!
      </p>
    </div>
  </div>
</template>