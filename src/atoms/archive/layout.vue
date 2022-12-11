<script setup>
const timeStarted = Date.now()
const timeFinished = ref(0)

const mounted = ref(false)
const items = [
    'world',
    'user',
    'thumbnails'
]
onMounted(() => {
    timeFinished.value = Date.now()
    mounted.value = true
})

</script>
<template>
    <div class="uk-section uk-section-small uk-section-muted">
        <div class="uk-container">
            <div class="uk-flex uk-grid uk-grid-collapse uk-card uk-card-default">
                <div class="uk-width-auto uk-background-muted uk-padding-small uk-flex uk-flex-column">
                    <ul class="uk-list uk-margin-remove">
                        <li v-for="(item, itemKey) in items">
                            <span class="uk-icon-button uk-card uk-card-default uk-border-rounded" :uk-icon="item"></span>
                        </li>
                    </ul>
                    <hr />
                    <ul class="uk-list uk-margin-remove">
                        <li v-for="(item, itemKey) in items">
                            <span class="uk-icon-button uk-border-rounded" :uk-icon="item"></span>
                        </li>
                    </ul>
                </div>
                <div class="uk-width-expand">
                    <div class="uk-container-small uk-card-body uk-border-rounded ">
                        <slot></slot>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<style>
html {
    background-color: #f8f8f8;
}
</style>