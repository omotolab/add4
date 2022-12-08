<script setup>
import { BoltIcon, BoltSlashIcon } from '@heroicons/vue/20/solid'
// import { BoltIcon, BoltSlashIcon } from '@heroicons/vue/20/outline'
const props = defineProps({
    name: String
})

const conditions = {
    'has_two': props.name.split('|').length > 0
}

/* if(conditions.has_two) {

} */

console.log('name', props.name)

</script>
<template>
    <div>
        <template v-if="!conditions.has_two">
            <div>one</div>
        </template>
        <template v-else>
            <div>two</div>
        </template>
    </div>
</template>