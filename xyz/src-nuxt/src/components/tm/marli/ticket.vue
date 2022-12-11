<template>
    <div class="uk-card uk-card-small uk-card-default">
        <!-- <nuxt-content-head :content="item" @select="(i) => $emit('select', i)" @switch="toc = !toc"/> -->
        <!-- <nuxt-content-body :content="item" :toc="toc" /> -->
        <div class="uk-card-body uk-height-max-large uk-overflow-auto">
            <div></div>
            <ul class="uk-list uk-margin-remove">
                <li v-for="event in item.events">
                    <span> {{ event.name }} </span>
                </li>
            </ul>
        </div>
        <uk-card-footer />
    </div>
</template>
<script>


export default {
    props: ['item', 'index', 'start'],
    data() {
        return {
            toc: false,
        }
    },
}
</script>