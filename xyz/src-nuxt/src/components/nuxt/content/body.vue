<template>
    <div class="uk-card-body uk-height-min-medium uk-height-max-large uk-overflow-auto">
        <div v-if="content.extension === '.md'">
            <div v-if="toc">
                <ul >
                    <li v-if="content.toc.length > 0" v-for="item in content.toc" :key="item.id">
                        <nuxt-link :to="'#' + content.path + '/' + item.id">{{ item.text }}</nuxt-link>
                    </li>
                    <li v-else>
                        This document has no headings...
                    </li>
                </ul>
            </div>
            <nuxt-content v-else :document="content" />
        </div>
        <div v-else>
            <pre>
                <code>
                    {{ toc }}
                    {{ content }}
                </code>
            </pre>
        </div>
    </div>
</template>
<script>
export default {
    props: ['content', 'toc']
}
</script>