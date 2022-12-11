<template lang="pug">
.uk-flex
        .uk-panel
            part(
            ).uk-card-small
                .uk-card-header
                    .uk-flex.uk-flex-between
                        .uk-flex.uk-flex-column.uk-flex-center
                            .uk-text-meta  {{ 'title: ' +document.title }}
                            .uk-text-meta  {{ 'description: ' +document.description }}
                        
                        .uk-flex.uk-flex-column.uk-flex-center.uk-flex-right.uk-text-right
                            .uk-text-meta  {{ 'created: ' +document.createdAt }}
                            .uk-text-meta  {{ 'updated: ' +document.updatedAt }}
                reader(
                    :document="document"
                ).uk-width-xlarge.uk-card-body
        //.uk-panel
            part(
                :title="'action'"
            ).uk-card-small
              .uk-card-body
                part(
                    :title="title"
                    :description="description"
                ).uk-card-default.uk-card-small
                    .uk-card-body(v-if="items[point - 1].extension === '.md'")
                        // part(
                            :title="items[point - 1].title"
                            :description="items[point - 1].description" )
                        hr

                        // nuxt-content(:document="items[point - 1]")
                        ul
                            li(
                                v-for="link of items[point - 1].toc"
                                :key="link.id"
                                :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }")
                                nuxt-link(:to="`#${link.id}`") {{ link.text }}
                    .uk-card-body.js-upload(v-if="items[point - 1].extension === '.csv'")
                        uploader(@upload="readFiles")
                            part(
                            :icon="items[point - 1].body[0].icon"
                            :type="'form'"
                            :title="items[point - 1].body[0].title"
                            :description="items[point - 1].body[0].description"
                            :bodyStyles="`uk-placeholder uk-text-center uk-button uk-width-1-1 uk-border-rounded`")
                        hr 
                        ul(
                            uk-height-match 
                            ).uk-flex.uk-grid.uk-grid-small.uk-list.uk-height-small.uk-overflow-auto
                                li(
                                    v-for="(item, itemKey) in items[point - 1].body.slice(1)"
                                    ).uk-margin-remove.uk-width-1-2.uk-padding-bottom
                                    part(
                                        :key="itemKey"
                                        :icon="item.icon"
                                        :title="item.title"
                                        :description="item.description"
                                        ).uk-border-rounded.uk-placeholder.uk-padding-remove.uk-card-small.uk-card-hover

</template>
<style scoped>
.uk-grid-small > *, .uk-grid-column-small > * {
    padding-left: 15px;
    padding-bottom: 10px;
}
</style>
<script>
import Part from '~/components/tm/part'
import Uploader from '~/components/tm/uploader'
import Reader from '~/components/tm/reader'
export default {
    layout: 'editor',
    components: {
        Part,
        Reader,
        Uploader
    },
    async asyncData({ $content, params, query, hash }) {

        const results  = await $content(`article`)
            .where({ slug: params.id })
            .only(['slug','extension','body','path','createdAt','updatedAt', 'title', 'description', 'toc'])
            .sortBy('asc')
            .fetch()

        const document = results[0]
        
        return {
            document
        }
    },
    data() {
        return {
            point: 1,
            icon: 'chevron-right',
            title: 'Select an item to share',
            description: 'There a many way you can install a virtual machine.',
        }
    },
    methods: {
       readFiles(inputs) {
                console.log(arguments, inputs)
                // this.file =  arguments[1][0];
                // this.reader = new FileReader();
                let finalResult = []
                //this.reader.onload = ((file) => (e) => {})(this.file);
                /* setTimeout(()=>{
                    this.$emit('upload', {
                        key: this.file.name.split(' ').join('_'),
                        body: this.file,
                        preview: this.reader.result,
                        caption: '',
                        id: Date.now()
                    })
                }, 1000)
                this.reader.readAsDataURL(this.file); */
            }
    }
}
</script>