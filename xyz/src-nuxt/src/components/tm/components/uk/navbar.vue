<template>
    <nav class="uk-background-muted">
        <div class="uk-container">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-grid uk-height-70">
                <div class="uk-width-medium">
                    <nuxt-link class="uk-logo uk-margin-small-left" :to="'/' + $route.params.scope">
                        <nuxt-logo class="uk-height-xsmall"/>
                    </nuxt-link>
                </div>
                <div class="uk-width-expand uk-flex uk-flex-middle uk-grid">
                    <div class="uk-width-expand uk-flex uk-flex-middle ">
                        <div v-show="search" class="uk-margin-small-left"><uk-search v-show="search"/></div>
                        <ul v-show="!search" class="uk-subnav uk-subnav-pill uk-margin-remove-top uk-margin-small-left">
                            <li v-for="(route, i) in routes" :class="route.name === $route.params.service ? `uk-active` : ''" :key="i">
                                <nuxt-link :to="route.path" class="uk-border-pill"> {{ route.name }} </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto uk-flex uk-flex-row-reverse">
                        <ul class="uk-iconnav uk-grid uk-grid-small">
                            <!-- <li>
                                <nuxt-link :to="`/${$route.params.scope}/account`">
                                    <span uk-icon="user" class="uk-icon-button"></span>
                                </nuxt-link>
                            </li> -->
                            <li class="uk-active">  
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
            search: false,
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