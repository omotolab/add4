export const usePost = ({ email }) => {
    const nuxtApp = useNuxtApp()
    /// return nuxtApp.$camera({ reader })
    return {
        message: "Your link is in your email."
    }
}