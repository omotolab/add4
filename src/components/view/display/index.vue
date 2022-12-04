<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const mainClass = "uk-height-viewport uk-flex uk-flex-middle uk-flex-center"
const darkClass = "uk-background-secondary"
const lightClass = "uk-background-default"

</script>
<template>
    <div class="uk-flex uk-flex-middle">
        <ul class="uk-iconnav uk-flex uk-flex-middle uk-flex-right">
            <li>

                <to-button :class="`${isDark ? darkClass : lightClass} uk-card-hover`">
                    <plus-icon style="height: 20px" />
                </to-button>
            </li>
        </ul>
    </div>
</template>