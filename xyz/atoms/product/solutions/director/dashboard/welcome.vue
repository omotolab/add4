<template lang="pug">
div
    h1.uk-h1 Welkom
    p Op deze pagina bevindt zich informatie over de Family Signs Research fase.
    h2 Activiteiten
    vs-row(justify="space-around" align='center')
        vs-col(v-for="activity in activities" :key="activity.type" w='2' h='1')
            nuxt-link( :to="activity.link" )
                vs-card
                    template(#title)
                        h3 {{ activity.title }}
                    template(#text)
                        p {{ activity.description }}
    
</template>
<script>
export default {
    layout: 'dashboard',
    data() {
        return{
            activities: [
                { 
                    title: 'done',
                    description: 'er zijn ... activiteiten voldaan',
                    type: 'done',
                    link: '/dashboard/activities/'
                 },
                { 
                    title: 'open',
                    description: 'er staan ... activiteiten open',
                    type: 'open',
                    link: '/dashboard/activities/'
                 },
                { 
                    title: 'next',
                    description: 'De volgende activiteit is op ...',
                    type: 'next',
                    link: '/dashboard/activities/'
                },
            ]
        }
    }
}
</script>