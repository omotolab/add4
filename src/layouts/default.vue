<script setup>
const href = window.location.href
const host = window.location.host
const port = window.location.port

const uuid = self.crypto.randomUUID();
const time = Date.now()
const mail = 'bolarin@omoto.la'
const name = 'Omotola Bolarin'

const pass = btoa(JSON.stringify({ uuid, time, mail, name }))
const code = href + `?pass=${pass}`

// const hash = self.crypto.getHashes();
// console.log('hash', self.crypto.subtle.encrypt())

function sign() {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    const payload = {
        "key": "@thismedium",
        "iat": Date.now()
    }
}

</script>
<template>
    <cover>
        <ul class="uk-list">
            <!--             <li>
                <div class="bg-white p-2 rounded shadow text-center">
                    <div>{{ host }}</div>
                    <div>{{ $route.fullPath }}</div>
                </div>
            </li> -->
            <li>
                <div class="bg-white p-2 rounded shadow text-center w-75">

                    <template v-if="$route.params.stream === 'coin'">
                        
                        <template v-if="$route.params.signal">
                            <div>{{ $route.params.stream }}</div>
                            <div class="uk-text-meta">{{ $route.params.signal }}</div>
                            <use-qrcode :text="code"/>
                        </template>
                        <template v-else>
                            <div>{{ $route.fullPath }}</div>
                        </template>
                    </template>
                    <template v-else>
                        <div>{{ host }}</div>
                        <div>{{ $route.fullPath }}</div>
                    </template>
                </div>
            </li>
            <li v-if="Object.entries($route.query).length">
                <ul class="uk-list">
                    <li v-for="entry in Object.entries($route.query)">
                        <pre class="w-75 h-25 overflow-auto text-xs"><code style="white-space: pre-wrap">{{ entry[1] }}</code></pre>
                    </li>
                </ul>
                <!-- <div class=" bg-white p-2 rounded shadow text-center ">
                    <div >{{ Object.entries($route.query).length }}</div>
                </div> -->
            </li>
        </ul>
    </cover>
</template>
<style>
/* Browser specific (not valid) styles to make preformatted text wrap */		

pre {
 white-space: pre-wrap;       /* css-3 */
 white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
 white-space: -pre-wrap;      /* Opera 4-6 */
 white-space: -o-pre-wrap;    /* Opera 7 */
 word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>