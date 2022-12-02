// formkit.config.ts
import { en, nl } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import '@formkit/themes/genesis'

const config: DefaultConfigOptions = {
  locales: { en, nl },
  locale: 'en'
}

export default config