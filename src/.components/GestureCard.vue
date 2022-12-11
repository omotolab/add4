<script setup>
const { label, samples } = defineProps({
    label: String,
    samples: Array,
})


const stream = samples
const data = {
    labels: stream.map((o, i) => i),
    datasets: [
        createLineChartData('x', { stream }),
        createLineChartData('y', { stream }),
        createLineChartData('z', { stream })
    ]
}

function createLineChartData(key, { stream }) {
    return {
        label: key,
        data: stream.map((signal) => {
            return signal[key]
        })
    }
}

</script>
<template>
    <ClientOnly>
        <div class="uk-card uk-card-small uk-card-default uk-border-rounded">
            <div class="uk-card-body">
                {{ label }}
            </div>
            <!-- <div v-if="samples.length > 0" class="uk-card-media">
                <LineChart :defaultChartData="data"/>
                <LineScope :stream="stream"/> 
            </div> -->
        </div>
    </ClientOnly>

</template>