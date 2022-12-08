<script setup>
const active = ref('text')
const modes = ['text', 'motion']
const setActive = (mode) => {
    active.value = mode
}

</script>
<template>
    <div class="bg-blue-300">

        <div class="container m-auto">
            <!-- <pre class="h-100 p-4">{{ content }}</pre> -->
            <div class="uk-width-large@s uk-margin-auto">
                <div class="uk-card-small uk-card-default">
                    <ul class="uk-subnav uk-subnav-pill uk-margin-remove" uk-margin uk-switcher="connect: .uk-switcher">
                        <li v-for="(mode, m) in modes" :class="active === mode ? `uk-active` : ''" :key="m"><a :href="`#${mode}`" @click="setActive(mode)">{{ mode }}</a></li>
                        <!-- <li><a href="#">Item</a></li>
                        <li class="uk-disabled"><a href="#">Item</a></li> -->
                    </ul>
                </div>
            </div>


        </div>
    </div>
</template>
<style scoped>
.uk-subnav>* {
    padding-left: 0px;
}

/* .uk-subnav>:not(:first-child) {
    padding-left: 0px;
} */
</style>