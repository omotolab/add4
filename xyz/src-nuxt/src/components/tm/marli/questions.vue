<script>
export default {
  data() {
  	return {
	    title: 'Frequently Asked Questions',
    	items: [
        { q: 'Do I pay for the service?', a: 'Marli is free for everyone who just wants to search for a ticket and purchase this once. Do you want to look ahead and ask Marli to reserve a ticket for you? Sign up for a Marli membership.' }, 
        { q: 'Could it happen that all of the tickets are sold out?', a: 'When you are not a Marli-Member, Marli can’t look ahead. This means that we can only offer what tickets are available. Marli-member? By letting Marli know ahead of time, Marli can already reserve a ticket for you.' },
        { q: 'How does Marli know if I want to go to an event?', a: 'By chatting with Marli you can share how sure you are about going to an event. This way, Marli can always plan ahead.'},
        { q: 'Can I buy tickets for my friends?', a: 'Marli is your assistant only, and designed to fight against ticket scalpers and overpriced re-sales. Therefore you can only buy one ticket, on your name. Share your ticket status with your friends to let them know you are going.'},
        { q: 'How are you able to offer a fair price?', a: 'Marli’s goal is to fight against the unfair second hand ticket market. By getting to know you, we are able to reserve tickets ahead of time. This way we won’t be offering more then what we need to keep Marli sharp and always on the lookout.'},
        { q: 'What happens if I am not able to go to the event?', a: 'Let Marli know ahead of time and get a refund. This way Marli will be able to give your ticket to someone else.'}
      
      ]
  	}
	}
}
</script>

<template lang="pug">
.uk-section.uk-background-secondary.uk-height-viewport.uk-flex.uk-flex-middle
    .uk-container.uk-light
        .uk-grid.uk-flex.uk-flex-center(class='uk-child-width-2-2@s' uk-height-match)
            .uk-margin-large-bottom.uk-text-center
                h2.uk-h2 Frequently Asked Questions
            div.uk-width-expand             
                ul(uk-accordion='multiple: true')
                        li(v-for='(item, index) in items')
                            a.uk-accordion-title(href='#') {{ item.q }}
                            .uk-accordion-content
                                p
                                | {{ item.a }}
</template>
