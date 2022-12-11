<template lang="pug">
.uk-section.uk-background-secondary.uk-height-viewport.uk-flex.uk-flex-middle
    .uk-container.uk-text-center.uk-light
        div
            .uk-margin-large-bottom
                h2.uk-h2  Plans & Pricing
                p A plan for everybody.

            .uk-grid.uk-flex.uk-flex-center(class='uk-child-width-1-3@s'  uk-height-match uk-scrollspy="cls: uk-animation-slide-bottom; target: .uk-card; delay: 80; repeat: false")
                div
                    .uk-card.uk-card-body
                        h1.uk-card-title Practice
                        p 
                        | Your first three suggestions every day are free. 
                div    
                    .uk-card.uk-card-body
                        h1.uk-card-title Part-time
                        p 
                        | Design your own plan, by selecting the amount of day’s you’ll need per month.
                div    
                    .uk-card.uk-card-body
                        h1.uk-card-title Performance
                        p  Unlimited access with extra features

        // div
            .uk-margin 
                h3.uk-h3
            .uk-grid.uk-flex.uk-flex-center(class='uk-child-width-1-3@s'  uk-height-match uk-scrollspy="cls: uk-animation-slide-bottom; target: .uk-card; delay: 80; repeat: false")
                div
                    .uk-card.uk-card-body
                        h1.uk-card-title Realtime prompts
                        p 
                        | Mini.ai will generate real-time prompts for sentences and paragraphs, while you are writing.

                div    
                    .uk-card.uk-card-body
                        h1.uk-card-title Add and edit
                        p 
                        | Select the suggestions you like, add them to your document and see your story unfold.
            
</template>