// formkit.config.ts
import { en, nl } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import '@formkit/themes/genesis'
import { BoltIcon } from '@heroicons/vue/24/solid'
import { BoltSlashIcon } from '@heroicons/vue/24/solid'
console.log()

const config: DefaultConfigOptions = {
  locales: { en, nl },
  locale: 'en',
  iconLoader: (iconName) => {
    // Return a Promise that resolves
    // to a string or undefined.
    // ... do other stuff here if you need to,
    // you have full control.
    return fetch(`https://cdn.jsdelivr.net/npm/heroicons@2.0.13/24/outline/${iconName}.svg`)
      .then(async (r) => {
        const icon = await r.text()
        if (icon.startsWith('<svg')) {
          return icon
        }
        return undefined
      }).catch((e) => {
        console.error(e)
        return undefined
      })
  }
}

export default config