// formkit.config.ts
import { en, nl } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import '@formkit/themes/genesis'
import { generateClasses } from '@formkit/themes'
import { BoltIcon } from '@heroicons/vue/24/solid'
import { BoltSlashIcon } from '@heroicons/vue/24/solid'
console.log()

const config: DefaultConfigOptions = {
  locales: { en, nl },
  locale: 'en',
  classes: generateClasses({
    text: {
      outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner: 'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
      input: 'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
      help: 'text-xs text-gray-500',
      messages: 'list-none p-0 mt-1 mb-0',
      message: 'text-red-500 mb-1 text-xs'
    },
  }),
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