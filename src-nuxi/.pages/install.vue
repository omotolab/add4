<script setup>
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
const host = 'thismedium.com'
const user = 'mini'

const time = Date.now()
const salt = Math.random()
const pass = Math.round((time * salt))

const token = JSON.stringify({
    host,
    time,
    user,
    pass
})

const text = location.value.href + '?token=' + token


</script>
<template>
    <cover>
        <div class="uk-width-1-1">
            <cover >
                <div class="uk-text-center">
                    <div>Install on your mobile device</div>
                    <div>with this code:</div>
                    <div class="uk-margin"><use-qrcode :text="text" class="uk-flex uk-flex-center"/></div>
                    <div v-if="$route.query.time">
                        <ul>
                            <li>{{ $route.query.time }}</li>
                            <li>{{ time }}</li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul>
                            <li>{{ pass }}</li>
                            <li>{{ time }}</li>
                        </ul>
                        
                    </div>
                </div>
                
            </cover>
            <!-- <div class="uk-card uk-card-default uk-card-footer">
                hello
                <div class="uk-height-small"></div>
            </div> -->
        </div>
       
    </cover>
</template>