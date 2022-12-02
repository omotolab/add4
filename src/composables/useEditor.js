export const useEditor = (setup) => {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$editor(setup)
}