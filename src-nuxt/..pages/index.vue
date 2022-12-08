<script setup>

const actions = ['install']
</script>

<template>
    <div >
        <div class="uk-text-small">
            <ul class="uk-list uk-list-small">
                <li v-for="action in actions">
                    <div>
                        <div class="uk-icon-button uk-width-auto uk-padding cursor-pointer">{{ action }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>