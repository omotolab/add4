<script setup>
const hostname = window.location.hostname

const names = {
    hostname: window.location.hostname,
    username: '@automotola',
    displayn: 'Omotola Bolarin',
    displayi: true
}

const display = {
    name: 'Omotola Bolarin',
    uuid: 'bolarin@omoto.la',
    ...names
}

</script>
<template>
    <div class="h-screen bg-gray-100 fixed">
        <div class="h-w-screen w-screen flex flex-col items-center justify-center shadow-inner bg-gray-300">
            <div>
                <div class="bg-white shadow-2xl rounded-lg p-0.5 my-2">
                    <div class="w-67 p-2" contenteditable="true">
                        <div>Omotola Bolarin</div>
                        <div> {{ hostname }}</div>
                    </div>
                    <hr class="m-0" />
                    <div>
                        Omotola
                    </div>
                </div>
            </div>

            <div class=" w-screen fixed-bottom pt-2" uk-slider="center: true">
                <ul class="uk-slider-items uk-grid-small">
                    <li><span class="uk-icon-button uk-border-rounded" uk-icon="search"></span></li>
                    <li v-for="(value, key) in display"><span
                            class="uk-icon-button uk-width-auto uk-padding-small uk-border-rounded">{{ value }}</span>
                    </li>
                </ul>
            </div>


        </div>
        <!--         <div >
            <ul class="uk-iconnav">
                <li><span class="uk-icon-button uk-border-rounded" uk-icon="search"></span></li>
                <li v-for="(value, key) in display"><span
                        class="uk-icon-button uk-width-auto uk-padding-small uk-border-rounded">{{ value }}</span></li>
            </ul>
        </div> -->



    </div>

</template>

<style scope>
.h-w-screen {
    height: 100vw;
}

.h-not-w-screen {
    height: calc(100vh - 100vw)
}

.uk-grid-column-small>*, .uk-grid-small>* {
    padding-left: 4px;
}
</style>