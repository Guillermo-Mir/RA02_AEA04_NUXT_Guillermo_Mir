<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

definePageMeta({ middleware: 'auth' })

const toast = useToast()
const route = useRoute()
const id = Number(route.query.id)

// Cargar los datos del pokémon actual
const { data: pokemon } = await useFetch(`/api/pokemons?id=${id}`)

const schema = z.object({
  name: z.string().min(2, 'Mínim 2 caràcters'),
  type: z.string().min(1, 'El tipus és obligatori'),
  generation: z.coerce.number().min(1).max(9),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: pokemon.value?.name,
  type: pokemon.value?.type,
  generation: pokemon.value?.generation,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/pokemons', {
      method: 'PUT',
      body: { id, ...event.data }
    })
    toast.add({ title: 'Pokémon actualitzat!', color: 'success' })
    navigateTo('/pokemons')
  } catch (error) {
    if (error instanceof FetchError) {
      toast.add({ title: 'Error', description: error.data.message, color: 'error' })
    } else {
      toast.add({ title: 'Error', description: "Error en l'aplicació", color: 'error' })
    }
  }
}
</script>

<template>
  <UCard class="max-w-md m-auto my-10 mt-4">
    <template #header>
      <h1 class="text-2xl text-center">EDITAR POKEMON</h1>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormField label="Name" name="name">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>

      <UFormField label="Type" name="type">
        <UInput v-model="state.type" class="w-full" />
      </UFormField>

      <UFormField label="Generation" name="generation">
        <UInput v-model="state.generation" type="number" class="w-full" />
      </UFormField>

      <div class="flex gap-2">
        <UButton type="submit">Guardar</UButton>
        <UButton color="neutral" to="/pokemons">Cancel·lar</UButton>
      </div>

    </UForm>
  </UCard>
</template>