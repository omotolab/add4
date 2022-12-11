<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

definePageMeta({
  middleware: 'auth'
})

watchEffect(() => {
  if (user.value)
    navigateTo('/tasks')
})
</script>

<template lang="pug">
div(class='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8')
    h2(class="my-6 text-center text-3xl font-extrabold u-text-white")
    | Sign in to your account
    tm-login
        button(class="mt-3" icon="mdi:github" block label="Github" variant="black" @click="auth.signIn({ provider: 'github' })")
</template>
