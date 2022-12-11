<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'

const client = useSupabaseClient()
let subscription: RealtimeSubscription

// Fetch collaborators and get the refresh method provided by useAsyncData
const { data: collaborators, refresh: refreshCollaborators } = await useAsyncData('collaborators', async () => {
  const { data } = await client.from('collaborators').select('name')
  return data
})

// Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
onMounted(() => {
  subscription = client.from('collaborators').on('*', () => {
    refreshCollaborators()
  }).subscribe()
})

// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
  client.removeSubscription(subscription)
})
</script>
