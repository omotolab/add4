<template lang="pug">
ul.uk-list.uk-list-collapse.uk-width-1-1
    li
        .uk-section.uk-section-small.uk-section-primary
            .uk-container
                h1 Time to order food
                p Find restaurants in your area
                form(@submit.prevent="console.log")
                    label 
                        span(uk-icon="location") 
                        span Address
                    
                    input(placeholder="Address, i.e Blaak 12").uk-input.uk-form-primary.uk-form-large
                    input(type="submit" value="Start").uk-button.uk-button-primary.uk-button-large
    li
        .uk-section.uk-section-small.uk-section-default
            .uk-container
                h2 How it works
                p Easy as that!
                slides(:props="propositions['tasks']")
    li
        .uk-section.uk-section-small.uk-section-default
            .uk-container
                h2 How it works
                p Easy as that!
                slides(:props="processes" :segments="5")
                // ul.uk-list.uk-list-collapse
                    li(v-for="process in processes")
                        n-link( :to="process.split('/')[2]").uk-flex.uk-flex-middle.uk-button
                            span(:uk-icon="process.split('/')[2]").uk-icon-button
                            span {{ process.split('/')[2]}}
    li
        .uk-section.uk-section-small.uk-section-primary
            .uk-container 
                h2 Downloads the app
                p Sit back and enjoy!
                button 
                    span Get it on Google play
                button 
                    span Available on App Store
    li
        .uk-section.uk-section-small.uk-section-muted
            .uk-container 
                h2 @thismedium.com
                p Your tagline!
                slides(:props="propositions['benifits']")
    li
        .uk-section.uk-section-small.uk-section-secondary
            .uk-container
                div logo
                div follow us social media
                    ul.uk-iconnav
                        li
                            span(uk-icon="twitter")
                        li
                            span(uk-icon="youtube")
                        li
                            span(uk-icon="google")
                        li
                            span(uk-icon="instagram")
                        li
                            span(uk-icon="linkedin")
                        li
                            span(uk-icon="github")
                ul(uk-accordion)
                    li 
                        a.uk-accordion-title Item 1
                        div.uk-accordion-content
                            p Another
                    li 
                        a.uk-accordion-title Item 1
                        div.uk-accordion-content
                            p Another
                    li 
                        a.uk-accordion-title Item 1
                        div.uk-accordion-content
                            p Another
                hr
                ul
                    li Recommend a restaurant
                    li Sign up a restaurant
                    li jobs
                    li terms of use
                    li privacy statement
                    li colophon
                    li cookie statement
                    li bug bounty
                        
</template>
<script>
export default {
    data() {
        return {
            structures: [],
            partners: [
                'omoto.la',
                'elisemarcus.com'
            ],
            resources: [
                'thismedium.com', 
            ],
            processes: [
                'logic.to/file/file-text',
                'logic.to/file/file-pdf',
                'logic.to/file/table',
                'logic.to/file/image',
                'logic.to/list/file',
                'logic.to/check/list',
                'logic.to/check/user',
                'logic.to/check/world',
                'logic.to/grid/check',
                'logic.to/search/grid',
                'logic.to/bag/search',
                'logic.to/tag/bag/',
                'logic.to/cart/tag',
                'logic.to/play/cart',
                'logic.to/star/play',
                'logic.to/comment/star',
                'logic.to/link/comment',
                'logic.to/lock/link',
                'logic.to/move/lock',
                'logic.to/clock/move',
                'logic.to/calendar/clock',
                'logic.to/mail/calendar',
                'logic.to/file-edit/mail',
                'logic.to/copy/file-edit',
                'logic.to/bookmark/copy',
                'logic.to/hashtag/bookmark',
                'logic.to/question/hashtag',
                'logic.to/heart/question'
            ],
            propositions: {
                benifits: [     
                    {   
                        icon: 'search',
                        headline: 'Your bonus.',
                        list: [
                            'The Punten programme: collect points and redeem them for great offers',
                            'Receive stamps, promotions, discounts, news and more, via our newsletters and social channels',
                        ]
                    },
                    {   
                        icon: 'check',
                        headline: 'You guarantee.',
                        list: [
                            'Excellent service for free',
                            'Authentic user reviews',
                            'Price guarantee: you pay just as much for your delivered meal, as you would pay when ordering directly from the restaurant'
                        ]
                    },
                    {   
                        icon: 'file',
                        headline: 'Your benifits.',
                        list: [
                            '10000+ partner restaurants to choose from',
                            'Pay cash or online',
                            'Order anytime, anywhere, on any device'
                        ]
                    }
                ],
                tasks: [
                    {   
                        icon: 'search',
                        title: 'Enter your location',
                        description: 'Enter your street address or let us find your location.'
                    },
                    {   
                        icon: 'check',
                        title: 'Choose your restaurant and food',
                        description: 'What do you fancy? Browse through countless menus and reviews.'
                    },
                    {   
                        icon: 'link',
                        title: 'Pay and get your food delivered',
                        description: 'Pay cash or online with iDEAL, Creditcard, PayPal, Bitcoin. Bon appetit!'
                    }
                ]
            },
            
            relationships: [],
            channels: [],
            segments: [],
            streams: [
                'mini.ai',
                'earthly.ai',
            ],
        }
    }
}
</script>