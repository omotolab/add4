<template>
    <div class="uk-card-body uk-width-large uk-height-min-medium uk-height-max-large uk-overflow-auto">
            <div v-if="toc">
                <ul >
                    <li v-for="item in document.toc" :key="item.id">
                        <nuxt-link :to="'#' + document.path + '/' + item.id">{{ item.text }}</nuxt-link>
                    </li>
                </ul>
            </div>
            <nuxt-content v-else :document="document" />
    </div>
</template>
<script>
export default {
    props: ['document', 'toc']
}
</script>