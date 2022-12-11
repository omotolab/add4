import UIkit from 'uikit/dist/js/uikit.min'
import Icons from 'uikit/dist/js/uikit-icons.min'
// import 'uikit/dist/css/uikit.min.css' Added in nuxt.config.css

UIkit.use(Icons)
UIkit.container = '#app'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            ui: UIkit
        }
    }
})