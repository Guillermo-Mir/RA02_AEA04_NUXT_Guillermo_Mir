<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: ["auth"],
});

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();


const schema = z.object({
  name: z.string().min(2, 'Mínim 2 caràcters'),
  type: z.string().min(1, 'El tipus és obligatori'),
  generation: z.coerce.number().min(1).max(9),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    type: undefined,
    generation: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    try{
        await $fetch('/api/pokemons', { //vincular
            method:'POST', 
            body: event.data //informacio del formulari
        })
         toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
         fetch()   
        } catch (error){
        if(error instanceof FetchError){
          // error controlat de fetch
            toast.add({ title: 'Error', description: error.data.message, color: 'error' })  
        }else{
          //error no controlat  
        } toast.add({ title: 'Error', description:"Error en l'aplicació", color: 'error' })  
    }
}

</script>

<template>
    <UCard class="max-w-md m-auto my-10 mt-4">
        <template> <h1 class="text-2xl text-center"> CREATE POKEMON </h1> </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            
             <UFormField label="Name" name="name">
                <UInput v-model="state.name" class="w-full" />
            </UFormField>

            
            <UFormField label="type" name="type">
                <UInput v-model="state.type"  class="w-full" />
            </UFormField>

            <UFormField label="Generation" name="generation">
                <UInput v-model="state.generation" type="generation"  class="w-full" />
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </UCard>
</template>