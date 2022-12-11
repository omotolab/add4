<template lang="pug">
.uk-container.uk-flex
    .uk-card.uk-width-xlarge.uk-margin-auto
        .uk-card-media
            div#map.uk-height-large.uk-border-rounded
        .uk-card-footer
            input(class="uk-range" type="range" min="3" max="15" v-model="zoom")
    // .uk-card.uk-width-medium
        .uk-card.uk-card-small.uk-card-default
            .uk-card-body 
                ul.uk-lsit
                    li {{"center: " + centers[center] }}
                    li {{"home:" + centers[home] }}
        ul.uk-list
            li(v-for="(center, centerKey) in centers") 
                .uk-card.uk-card-small.uk-card-default
                    .uk-card-body.uk-text-meta(@click="changeCenter(centerKey)") {{ center }}
</template>
<style>
    body { margin: 0; padding: 0; }
    
</style>
<script>
import mapboxgl from "mapbox-gl";
const ACCESS_TOKEN = 'pk.eyJ1IjoiY29vcmRpbmF0dXJlIiwiYSI6ImNrcnZ6NW42MzBiaWwycW5xdmN2Z29lYWMifQ.qupkWStUcxXGDNdy2p0HXg';

export default {
    layout: 'logic',
    data() {
        return {
            zoom: 12,
            pitch: 60,
            center: 0,
            home: 0,
            style: 0,
            styles: [
                // 'mapbox://styles/examples/cj68bstx01a3r2rndlud0pwpv',
                'mapbox://styles/mapbox/light-v10',
                // 'mapbox://styles/mapbox/satellite-v9',
                
            ],
            centers: [
                [4.460600572960162, 51.93301499045255],
                [4.4304788, 51.9483793],
                [-114.34411, 32.6141],
                [11.925736, 5.128746],
                [-74.5, 40],
                [-87.62712, 41.89033],
                [148.9819, -35.3981]
            ]
        }
    },
    mounted() {
        mapboxgl.accessToken = ACCESS_TOKEN;
        const point = this.centers[this.center]
        const home = this.centers[this.home]

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: this.styles[this.style], // style URL
            center: point, // starting position [lng, lat]
            zoom: this.zoom,
            // pitch: this.pitch,
            bearing: 80,
            attributionControl: false,
            antialias: true
        });  
        
        // require('~/assets/script/map-object').default(map, mapboxgl, point, home)
        console.log(this.generateNewCenter())
    },
    methods: {
        changeCenter(centerKey) {
            this.center = centerKey
        },
        async generateNewCenter() {
            return await this.$axios.$get('https://wanderdrone.appspot.com')
        }
    }
}
</script>