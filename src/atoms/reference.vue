<template lang="pug">
div.uk-width-1-1.uk-section Hello
    .uk-grid.uk-grid-small.uk-flex
        .uk-panel.uk-width-1-3.uk-margin-small
            article(v-for="page in pages").uk-background-default
                .uk-card-footer.uk-text-meta {{ page.path }}
                    // nuxt-content(:document="page")
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const pages = await $content('', { deep: true }).fetch()

    return {
      pages
    }
  },
  data() {
    return {
      polls: [],
      documents: {
        "#drawing": [
          'https://is.muni.cz/th/ggwaw/thesis.pdf'
        ]
      },
      videos: {
        '#drawings': [
          'https://www.youtube.com/watch?v=fRjFwTbJfes',
          'https://www.youtube.com/watch?v=3izFMB91K_Q',
          'https://www.youtube.com/watch?v=Usngvpiv_LI'
        ]
      },
      links: {
        '#ai': [
          'https://c3.ai/what-is-enterprise-ai/'
        ]
      },
      searches: {
        "#google": [
          'https://www.google.com/search?q=as+a+reverse+auction+game&rlz=1C5CHFA_enNL899NL904&oq=as+a+reverse+auction+game&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8',
          'https://www.google.com/search?q=Stackelberg+game&rlz=1C5CHFA_enNL899NL904&oq=Stackelberg+game&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8',
          'https://www.google.com/search?q=what+is+market+expansion+economics&rlz=1C5CHFA_enNL899NL904&source=lnms&tbm=vid&sa=X&ved=2ahUKEwikucuzp_HxAhWEPewKHYKrBKsQ_AUoA3oECAEQBQ&biw=1356&bih=622'
        ]
      },
      references: {
        '#money#privacy': [
          'https://www.sciencedirect.com/science/article/pii/S1877050916302447',
          'doi:10.1016/j.procs.2016.04.211',
          'https://c3.ai/what-is-enterprise-ai/',
          'https://investors-corner.bnpparibas-am.com/markets/the-inherent-risks-of-crypto-currencies-when-bitcoin-meets-chinas-cbdc/',
          'https://www.sciencedirect.com/science/article/pii/S1877050916301697',
          'https://reader.elsevier.com/reader/sd/pii/S1877050916301387?token=1A203F33A1640494BE5731A964A991970141F83FF75A9F2C10E31D5D1D5F71E045FD39C70F3551F26C8B624EFAB450DD&originRegion=eu-west-1&originCreation=20210720081923',
          'https://www.sciencedirect.com/science/article/pii/S1877050916301387',

        ]
      }
    }
  }
}
</script>