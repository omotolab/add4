<script setup>
const { data } = await useFetch('/api/sample')

async function handleSave(outputData) {
   /*  const { data } = await useFetch('/api/sample', {
        type: 'post', 
        body,
    }) */
    const { public: { API, KEY } } = useRuntimeConfig()
    const endpoint = '/rest/v1/sample'
    const requestPath = `https://` + API + '.supabase.co' + endpoint
    const requestOptions = {
        method: 'post',
        headers: {
            "apiKey": KEY,
            "Authorization": `Bearer ${KEY}`
        },
        body: {
            data: outputData
        }
    }
    const { data, error } = await useFetch(requestPath, requestOptions)
    console.log('back', data)
    
}


</script>
<template>
    <div class="uk-width-medium">
        <view-editor @save="handleSave"></view-editor>
    </div>
</template>