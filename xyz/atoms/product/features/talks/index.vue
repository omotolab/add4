<template lang="pug">
div.uk-flex
    messenger(
        :currentUser="user"
        :addConversation="addConversation"
        :conversations="conversations"
    ).uk-height-viewport
    assistant.uk-width-medium
</template>
<script>
export default {
    data() {
        return {
            user: {},
            conversations: {},
            conversationList: []
        }
    },
    fetch() {
        this.user = {
            id: '654321',
            name: 'Current User',
            email: 'jane@example.nl',
            photoUrl: null,
            welcomeMessage: 'Hello from currentUser',
            role: "Initiator"
        }
    },
    mounted() {
        this.$gun.get('conversations').map().on((node, key) => {

            // add results straight to the Vue component state
            // and get updates when nodes are updated by GUN
            console.log('object', key, node)
            this.conversations[key] = node;
        });
    },
    methods: {
        addConversation() {
            this.$gun.get('conversations').set(this.conversation);
        },
    }
}
</script>
