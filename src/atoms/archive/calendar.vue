<template>
    <div>
        <Calendar />
        <DatePicker v-model="date" />
    </div>
</template>
<script>
// Component.vue script
import { Calendar, DatePicker } from 'v-calendar';

export default {
    components: {
        Calendar,
        DatePicker,
    },
    data() {
        return {
            date: new Date(),
        };
    },
}
</script>