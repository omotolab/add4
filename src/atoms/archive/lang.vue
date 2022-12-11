<script setup>
const { locale } = useI18n()
</script>
<template>
    <view-screen>
        <template v-slot:nav>
            <FormKit v-slot:header v-model="locale" type="select" label="Which country is the smallest?"
                name="small_country" :options="[
                    'en',
                    'nl'
                ]" />
        </template>
        <slot></slot>
    </view-screen>
</template>