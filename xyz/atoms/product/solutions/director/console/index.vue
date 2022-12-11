<template lang="pug">
.uk-height-viewport.uk-background-secondary
    .uk-container.uk-background-primary
        .uk-padding-small.uk-container.uk-light
            
            button(@click="getMedia").uk-button.uk-button-default.uk-button-small Get Media
            button(@click="getCategories").uk-button.uk-button-default.uk-button-small Get Categories
            button(@click="getPlaces").uk-button.uk-button-default.uk-button-small Get Places
            button(@click="getArticles").uk-button.uk-button-default.uk-button-small Get Articles
            button(@click="getImages").uk-button.uk-button-default.uk-button-small Get Images
            // button(@click="createPlaces").uk-button.uk-button-default.uk-button-small Create Places
            button(@click="createArticles").uk-button.uk-button-default.uk-button-small Create Articles
            // button(@click="updateImages").uk-button.uk-button-default.uk-button-small Create Images
            button(@click="updateImages").uk-button.uk-button-default.uk-button-small Update Images
            button(@click="updateOldImages").uk-button.uk-button-default.uk-button-small Update Old Images
    .uk-container.uk-background-muted
        .uk-padding-small Dagmar Baumann
        .uk-grid.uk-height-1-1.uk-child-width-1-2
            .uk-container.uk-width-medium.uk-box-shadow-large
                .uk-padding-small Articles
                .uk-background-muted.uk-padding-small
                    ul.uk-list(uk-sortable)
                        li(v-for="(work, w) in articles" @click="handleWorkClick(work)") 
                            .uk-card.uk-card-small.uk-card-default
                                .uk-card-header {{ work.id }}
            .uk-container.uk-width-expand 
                .uk-padding-small Article
                .uk-background-muted.uk-padding-small 
                    .uk-card.uk-card-small(v-if="work.id")
                        .uk-card-header {{ work.title }}
                        .uk-card-media(v-if="work.items")
                            // ul
                                li(v-for="(item, p) in work.items") {{ item.title }}
                            ant-carousel(:items="work.items")
                            p {{ work.description }}
                
    
</template>
<script>
import AntCarousel from '~/atoms/ant/carousel'
import * as R from 'rambda'
export default {
    layout: 'mini',
    components: {
        AntCarousel
    },
    data() {
        return {
            work: {}
        }
    },
    methods: {
        handleWorkClick(work) {
            console.log(work)
            this.work = work
        },
        getArticles() {
            this.$store.dispatch('bindArticles')
        },
        getImages() {
            this.$store.dispatch('bindImages')
        },
        getMedia() {
            this.$store.dispatch('bindMedia')
        },
        getCategories() {
            this.$store.dispatch('bindCategories')
        },
        getPlaces() {
            this.$store.dispatch('bindPlaces')
        },
        createPlaces() {
            const newPlaces = this.categories.map(place => {
                let newPlace = {
                    id: place.id,
                    name: place.name,
                    parent: place.parent,
                    path: place.link.slice(37),
                } 
                return newPlace
            })

            this.$store.dispatch('place/create', newPlaces)

        },
        createArticles() {   
            let newWorks = []
            this.places.forEach(place => {
                const point = place.point[1]
                const listPredicate = x => R.includes(point, x.categories)
                const filteredImages = R.filter(listPredicate, this.images)
                const groupFunction = x => {
                    if(x.alt_text.trim().length > 0) {
                        return x.alt_text.split('#')[0].trim()
                    } else {
                        return x.title.trim()
                    }
                }
                const groupedImages = R.groupBy(groupFunction, filteredImages)
                
                Object.entries(groupedImages).forEach(entry => {
                    // console.log(entry[1])
                    newWorks.push({
                        title: entry[0],
                        description: entry[1][0].image.description.rendered,
                        items: entry[1].map((entry => {
                            const parts = entry.image.source_url.split('/')
                            return parts[parts.length - 1]
                        })),
                        places: [place.path]
                    })
                })

                // console.log(place.point, place.path, groupedImages)
                
                
            })
            // console.log(newWorks)
            this.$store.dispatch('article/create', newWorks)

        },
        createImages() {
            const newImages = this.media.map(image => {
                let newImage = {
                    title: image.title.rendered,
                    caption: image.caption.rendered, // .slice(3,-4)
                    alt_text: image.alt_text,
                    categories: image.categories,
                    image: image
                } 

                image.media_details ? newImage.details = image.media_details : newImage.details = {}
                return newImage
            })
            
            this.$store.dispatch('image/create', newImages)
        },
        updateImages() {
            const updatedImages = this.images.map(image => ({
                more: image.image,
                id: image.id,
                title: image.title,
                alt_text: image.alt_text,
                caption: image.caption,
                details: image.details,
                url: image.image.source_url.split('/')[image.image.source_url.split('/').length - 1]
            }))

            // console.log(updatedImages)

            this.$store.dispatch('image/update', updatedImages)
        },
        updateOldImages() {
            const updatedImages = this.images.map(image => ({
                caption: {
                    rendered: image.caption
                },
            }))

            // console.log(updatedImages)

            this.$store.dispatch('image/update', updatedImages)
        }
    },
    computed: {
        articles() {
            return this.$store.state.articles
        },
        images() {
            return this.$store.state.images
        },
        places() {
            return this.$store.state.places
        },
        categories() {
            return this.$store.state.categories
        }
    }
}
</script>
<style>
.ant-carousel[data-v-1ef5714e] .slick-slide img {
    margin: 0;
}
.ant-carousel .slick-dots {
    text-align: left;
}

p {
    margin-top: 55px;
    column-count: 2;
}
</style>