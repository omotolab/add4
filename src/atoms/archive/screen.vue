<script setup>
const items = [
    'hello',
    'world'
]
</script>
<template>
    <div class="uk-grid uk-grid-collapse">
        <div class="uk-width-expand" uk-height-viewport>
            <slot></slot>
        </div>
        <div class="uk-width-auto uk-background-muted">
            <div class="uk-padding-small">
                <slot name="nav">
                    <ul class="uk-list uk-list-small">
                        <li v-for="(item, itemKey) in items" :key="itemKey">
                            <span uk-icon="world">{{ item }}</span>
                        </li>
                    </ul>
                </slot>
            </div>
        </div>

    </div>
</template>