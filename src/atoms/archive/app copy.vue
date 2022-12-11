<script setup>
const setup = ref(false)
const handleSetupData = (setup) => {
 setup.value = true
}

</script>
<template>
    <div>
        <Setup v-if="!setup" @setup="handleSetupData"/>
        <Welcome v-else  />
    </div>
</template>
