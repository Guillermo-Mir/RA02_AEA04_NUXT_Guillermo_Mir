<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
  <UCard class="flex justify-end p-4">
    <div v-if="loggedIn" class="flex items-center gap-4">
      {{ user?.login }}
      <UButton
        class="bg-red-500 hover:bg-red-600 text-white"
        @click="clear(); navigateTo('/login')"
      >
        Logout
      </UButton>
    </div>
    <div v-else class="flex gap-2">
      <UButton class="bg-black hover:bg-gray-800 text-white" as-child>
        <NuxtLink to="/login">Login</NuxtLink>
      </UButton>
      <UButton class="bg-black hover:bg-gray-800 text-white" as-child>
        <NuxtLink to="/register">Registre</NuxtLink>
      </UButton>
    </div>
  </UCard>
</template>
