<script async setup>
import { createClient } from '@supabase/supabase-js'
import { useLocalStorage } from '@vueuse/core'
const { public: { mode } } = useRuntimeConfig()
const body = useLocalStorage('local', {
    type: 'article',
    title: 'title',
    description: 'description',
    content: {
        time: Date.now(),
        version: 0,
        blocks: []
    }
})

const id = 'owekiaqxbdrjnshdsntm'
const name = '2tangosigns.com'
const url = `https://${id}.supabase.co`
const q = {
    anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZWtpYXF4YmRyam5zaGRzbnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY0OTU1MDksImV4cCI6MTk4MjA3MTUwOX0.qMTjgOs4YvhIN1SKqto8DOlZokAtHqzHs530uiG8HsA',
    service: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZWtpYXF4YmRyam5zaGRzbnRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NjQ5NTUwOSwiZXhwIjoxOTgyMDcxNTA5fQ.tNZLTxGKVSAkclg9NpphflBtEZs6io2iMUfpmetmKv8'
}

// Create a single supabase client for interacting with your database
const supabase = createClient(url, q.anon)
const channel = 'signals'
const items = ref([])
const { data, error } = await supabase.from(channel).select()
data.map(async (item) => {
    const { data, error } = await supabase.storage.from('public').download(item.key)
    const text = await data.text()
    items.value.push({
        ...item,
        samples: JSON.parse(text)
    })
})


</script>
<template>
    <div class="uk-section uk-section-small uk-section-muted uk-container">
        <LibraryGrid :items="items"/>
    </div>
</template>