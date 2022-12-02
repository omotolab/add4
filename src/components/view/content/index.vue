<script setup>
const props = defineProps(['core','modelValue'])
const settings = props.core
</script>
<template>
    <div>
        
        <template v-if="!core">
            <div><slot /></div>
            <div>no-core</div>
        </template>
        <template v-else>
            <div><slot /></div>
            <div> 
                <div>core</div>
                <!-- <view-content-editor :settings="settings"/> -->
            </div>
        </template>
    </div>
</template>