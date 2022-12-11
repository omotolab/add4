<template>
    <nav class="uk-card uk-card-primary uk-light">
        <div class="uk-container">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-grid uk-height-70">
                <div class="uk-flex uk-flex-middle">
                    <nuxt-link class="uk-logo uk-margin-small-left@s" to="/">
                        <tm-marli-logo />
                    </nuxt-link>
                </div>
                <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-center uk-grid uk-grid-small">
                    <div class="uk-width-expand uk-flex uk-flex-middle  uk-flex-center">
                        <div v-show="search" class="uk-flex uk-flex-middle">
                            <uk-search v-show="search"/>
                        </div>
                        <ul v-show="!search" class="uk-subnav uk-subnav-pill uk-margin-remove-top uk-margin-small-left">
                            <li v-for="(route, i) in routes" :class="route.name === $route.params.service ? `uk-active` : ''" :key="i">
                                <nuxt-link :to="route.name" class="uk-border-pill"> {{ route.name }} </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto uk-flex uk-flex-row-reverse">
                        <ul class="uk-iconnav uk-grid uk-grid-small">
                            
                            <template v-if="!search">
                                
                                
                                <li>
                                    <nuxt-link :to="`#user`">
                                        <span uk-icon="user" class="uk-icon-button"></span>
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="`#calendar`">
                                        <span uk-icon="calendar" class="uk-icon-button"></span>
                                    </nuxt-link>
                                </li> 
                                <li>
                                    <nuxt-link :to="`#cart`">
                                        <span uk-icon="cart" class="uk-icon-button"></span>
                                    </nuxt-link>
                                </li>
                            
                            </template>
                            <li class="uk-active uk-margin-left">  
                                <div class="uk-grid uk-grid-small uk-flex uk-flex-middle">
                                    <div>
                                        <nuxt-link :to="query">
                                            <span :uk-icon="search ? 'close' : 'search'" :class="search ? `uk-icon-button uk-button-default` : `uk-icon-button`" @click="toggleSearch"></span>
                                        </nuxt-link>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </nav>
</template>
<style>
    .uk-height-70 {
        height: 70px
    }
    .uk-height-xsmall {
        height: 50px
    }
    .uk-margin-small-left {
        
    }
</style>
<script>
export default {
    props: ['items'],
    data() {
        return {
            routes: this.items,
            search: true,
            query: ''
        }
    },
    methods: {
        toggleSearch() {
            this.search = !this.search
            if(!this.search) return this.query = ''
            this.query = `?search=`

        }
    }
}
</script>