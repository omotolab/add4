<template>
    <div class="uk-flex uk-flex-between uk-flex-middle uk-card-header">
        <div class="uk-flex uk-flex-middle">
            <div class="uk-flex uk-flex-middle">
                <span v-show="extension === '.md'" uk-icon="file-text"></span>
                <span v-show="extension === '.csv'" uk-icon="table"></span>
            </div>
            <div class="uk-margin-small-left "> 
                <span class="uk-text-small"> {{ slug }} </span>
            </div>
        </div>
        <div>
            <ul class="uk-margin-remove uk-flex uk-flex-inline uk-list">
                <li>
                    <a class="uk-icon-button uk-border-rounded" @click="switchOn = !switchOn">
                        <span v-if="!switchOn" uk-icon="icon: plus" />
                        <span v-else uk-icon="icon: check"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['extension', 'slug'],
    data() {
        return {
            switchOn: false
        }
    },
    watch: {
        switchOn(newState) {
            this.$emit('select', newState)
        }
    } 
}
</script>
