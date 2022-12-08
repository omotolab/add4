export const useCamera = ({ reader, settings, verbose }) => {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$camera({ reader })
}