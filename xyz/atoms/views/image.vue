<template lang="pug">
div.uk-container.uk-flex.uk-flex-center
    div
        ul(uk-switcher uk-margin).uk-thumbnav
            li(v-for="photo in images").uk-padding-remove
                a(href="#") 
                    img(:src="photo.ico" width="46")
        ul.uk-switcher
            li(v-for="photo in images ")
                .uk-card.uk-card-secondary.uk-card-small.uk-width-large
                    .uk-card-footer {{ photo.id }}
                    .uk-card-media
                        img(:src="photo.src").uk-width-1-1
                
</template>
<script>
import { createClient } from 'pexels';
const PEXEL_KEY = '563492ad6f91700001000001922e5446d6744da6a6d2e19b4c0fdea7';
const PIXA_KEY = '22789886-4938338ff3d24ea882eab5795';

const client = createClient(PEXEL_KEY);


export default {
    layout: 'logic',
    async asyncData({ $axios }) {
        const PER_PAGE = 5
        const path = 'https://api.pexels.com/v1/';
        const query = 'Nature';
        const { photos } = await client.photos.search({ query, per_page: PER_PAGE })

        
        const PIXA_PATH = 'https://pixabay.com/api?key=' + PIXA_KEY + '&per_page=' + PER_PAGE
        const PIXA_QUERY = 'red roses'
        const URL = PIXA_PATH+"&q="+encodeURIComponent(PIXA_QUERY);
        const { hits } = await $axios.$get(URL, { per_page: PER_PAGE })
        
        const images = [
            ...hits.map(hit => ({ 
                id: hit.id,
                ico: hit.previewURL,
                src: hit.webformatURL,
                
                ...hit
            })),

            ...photos.map(photo => ({
                id: photo.id,
                ico: photo.src.tiny,
                src: photo.src.medium
            }))

        ]

        return {
            images
        }
    }
}
</script>