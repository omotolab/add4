<script setup>
const href = window.location.href
const host = window.location.hostname
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
        <div class="uk-section">
            <div>
                <ul class="uk-list uk-list-small">
                    <li>
                        <ul class="uk-iconnav" uk-height-match>
                            <li class="uk-width-expand">
                                <div class="bg-white p-2 rounded shadow text-center">{{ host }}</div>
                            </li>
                            <li>
                                <hr class="uk-divider-vertical" />
                            </li>
                            <li>
                                <div class="bg-white p-2 rounded shadow text-center">{{ port }}</div>
                            </li>
                           
                        </ul>
                    </li>
                    <li><hr /></li>
                    <li>
                        <ul class="uk-iconnav" uk-height-match>
                            <li>
                                <div class="bg-white p-2 rounded shadow text-center">{{ $route.params.stream }}</div>
                            </li>
                            <li>
                                <hr class="uk-divider-vertical" />
                            </li>
                            <li class="uk-width-expand">
                                <div class="bg-white p-2 rounded shadow text-center">{{ $route.params.signal }}</div>
                            </li>
                            <li>
                                <hr class="uk-divider-vertical" />
                            </li>
                            <li>
                                <div class="bg-white p-2 rounded shadow text-center">{{ $route.params.signal }}</div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <li>
                        <div class="bg-white p-2 rounded shadow text-center ">
                            <!-- <div>{{ host }}</div> -->
                            <div class="uk-text-meta w-75">
                                <div>{{ $route.params.stream }}</div>
                                <div>{{ $route.params.signal }}</div>
                            </div>
                            <use-qrcode :text="`${host}/`" class="w-75 h-75" />
                        </div>
                    </li>
                    <li>
                        <div class="bg-white p-2 rounded shadow text-center ">

                            <template v-if="$route.params.stream === 'coin'">

                                <template v-if="$route.params.signal">
                                    <div>{{ $route.params.stream }}</div>
                                    <div class="uk-text-meta w-75">{{ $route.params.signal }}</div>
                                    <use-qrcode :text="code" class="w-75 h-75" />
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
                                <pre
                                    class="w-75 h-25 overflow-auto text-xs"><code style="white-space: pre-wrap">{{ entry[1] }}</code></pre>
                            </li>
                        </ul>
                        <!-- <div class=" bg-white p-2 rounded shadow text-center ">
                    <div >{{ Object.entries($route.query).length }}</div>
                </div> -->
                    </li>
                </ul>
            </div>
        </div>

    </cover>
</template>
<style>
/* Browser specific (not valid) styles to make preformatted text wrap */
.uk-divider-vertical {
    width: -moz-max-content;
    width: max-content;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    border-left: 1px solid #e5e5e5;
}

.uk-list>*>ul, .uk-list>:nth-child(n+2) {
    margin-top: 4px;
}

.uk-iconnav>:nth-child(n+2) {
    padding-left: 4px;
}

pre {
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
}
</style>