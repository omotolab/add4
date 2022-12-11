<template lang="pug">
div
    .uk-section.tm-primary.uk-height-auto.uk-padding-remove-bottom.uk-background-fixed.uk-background-cover.uk-background-center-center.uk-width-extralarge(style='background-image: url(img/background.png);')
        .uk-container.uk-section
            .uk-height-large(uk-grid)
                .uk-flex.uk-flex-top.uk-margin-large-bottom(class="uk-width-auto@s")
                    .uk-background.uk-panel
                        .uk-card.uk-card-small
                            .uk-article.uk-width-medium
                                .uk-article-title 
                                    | Everybody
                                    | deserves to be 
                                    strong.strongyellow understood, 
                                    | especially 
                                    | when its 
                                    strong.strongyellow family.
                                p.uk-article-meta it is a messenger app, that assists in starting a conversation and expressing yourself to your family.
                                .uk-flex.uk-grid-small.uk-child-width-auto(uk-grid='')
                                    div
                                        a.uk-button.uk-button-secondary.uk-card.uk-card-default(href='#info') Learn More
                                    div
                                        nuxt-link(to="app/start").uk-button.uk-button-primary.uk-card.uk-card-default Try Now
                .uk-flex.uk-flex-bottom.uk-flex-center(class="uk-width-expand@s")
                    .uk-background.uk-panel
                        img(data-src='img/phone.png', alt='', uk-img='', height='', width='').uk-width-large

    //the slogan"whatdoesit"-section
    .uk-section.uk-background-primary.uk-panel.uk-box-shadow-xlarge
        .uk-card
            .uk-card-body.uk-flex.uk-flex-center.uk-text-center
                .uk-article
                    .uk-article-title.title2 Signs is a messenger app that helps me expressing myself, to my family.
                    br
                    br
                    nuxt-link(to="app/start").uk-button.uk-button-primary Try Now

    //how does it work-section
    #info.uk-section.uk-background-default.uk-padding.uk-panel.uk-flex.uk-flex-center
        .uk-container-small
            .uk-section-small.uk-text-center
                h2 How does it work?
                p We have developed three main features, that can be used to create a unique way of communicating with your family.
            .uk-section-small 
                .uk-flex.uk-flex-center.uk-border-rounded.uk-card.uk-grid-collapse.uk-margin-large(class='uk-child-width-1-2@s', uk-grid='')
                    .uk-card-hover.uk-border-rounded.uk-card-media-left.uk-cover-container.uk-width-medium.uk-height-large
                        img(src='/img/frames/responding.png' uk-cover)
                    div.uk-width-medium.uk-height-large
                        .uk-card-body
                            article.uk-padding-small
                                h3.uk-card-title Assistent
                                p
                                    | The assistent helps you be more understood 
                                    | more often and reveal what you really mean. 
                                    | It interprets the statement you are making 
                                    | and helps you build an sentence.
            .uk-section-small 
                .uk-flex.uk-flex-center.uk-card.uk-grid-collapse.uk-margin-large(class='uk-child-width-1-2@s', uk-grid='')
                    .uk-card-hover.uk-border-rounded.uk-card-media-right.uk-cover-container.uk-width-medium.uk-height-large(class='uk-flex-last@s')
                        img(src='/img/frames/receiving.png', alt='', uk-cover='')
                        canvas(width='360', height='640')
                    div.uk-width-medium.uk-height-large
                        .uk-card-body
                            article.uk-padding-small
                                h3.uk-card-title Remote
                                p
                                    | The signs remote the motions of your hand 
                                    | or the motions you make with your phone, 
                                    | to make words or phrases with gestures.
            .uk-section-small
                .uk-flex.uk-flex-center.uk-card.uk-grid-collapse.uk-margin-large(class='uk-child-width-1-2@s', uk-grid='')
                    .uk-card-hover.uk-border-rounded.uk-card-media-left.uk-cover-container.uk-width-medium.uk-height-large
                        img(src='/img/frames/sending.png' uk-cover)
                    div.uk-width-medium.uk-height-large
                        .uk-card-body
                            article.uk-padding-small
                                h3.uk-card-title Manager
                                p
                                    | With the manager by your side, 
                                    | you can get a great overview of your situation. 
                                    | It is a dashboard.
    //why signs-section
    .uk-section.uk-section-muted
        .uk-section-muted.uk-container
            .uk-article.uk-text-center
                h2.uk-h2 Why signs?
                p.uk-text-small it is a messenger app, that assists in starting a conversation and expressing yourself to your family.
            
            //slider
            .uk-section
                div(uk-slider='')
                    ul.uk-slider-items.uk-slider-items.uk-grid(class="uk-child-width-1-2@s uk-child-width-1-3@m")
                        li
                            div.uk-panel
                                div.uk-card.uk-card-default
                                    .uk-card-media-top
                                        img(width='', height='', src='https://via.placeholder.com/500', alt='')
                                    p.uk-card-body with multi-channel-communication you can communicatie 
                        li
                            div.uk-panel
                                div.uk-card.uk-card-default
                                    .uk-card-media-top
                                         img(width='', height='', src='https://via.placeholder.com/500', alt='')
                                    p.uk-card-body with multi-channel-communication you can communicatie
                        li
                            div.uk-panel
                                div.uk-card.uk-card-default
                                    .uk-card-media-top
                                         img(width='', height='', src='https://via.placeholder.com/500', alt='')
                                    p.uk-card-body with multi-channel-communication you can communicatie 
                    ul.uk-slider-nav.uk-dotnav.uk-margin-bottom.uk-padding.uk-flex.uk-flex-center

        //who else-section
            .uk-section
                .uk-article
                    h2.uk-h3 Who else uses signs?
                    p.ux-text-small These are testimonials of our clients.
            .uk-section
                .uk-grid-match.uk-text-center(class='uk-child-width-expand@s', uk-grid='')
                    div
                        .uk-card.uk-card-default
                            .uk-card-header
                                .uk-grid-small.uk-flex-middle(uk-grid='')
                                .uk-width-auto
                                    img.uk-border-circle(width='40', height='40', src='img/elipse21.png')
                                .uk-width-expand
                                    h3.uk-card-title.uk-margin-remove-bottom Tim
                                    p.uk-text-meta.uk-margin-remove-top
                                    time(datetime='2016-04-01T19:00') April 01, 2016
                            .uk-card-body
                                p I can express my feelings, the way I like to express myself with assistive help.
                                | 
                            .uk-card-footer
                                a.uk-button.uk-button-text(href='#') Read more
                    div
                        .uk-card.uk-card-default
                            .uk-card-header
                                .uk-grid-small.uk-flex-middle(uk-grid='')
                                .uk-width-auto
                                    img.uk-border-circle(width='40', height='40', src='img/elipse22.png')
                                .uk-width-expand
                                    h3.uk-card-title.uk-margin-remove-bottom Charell
                                    p.uk-text-meta.uk-margin-remove-top
                                    time(datetime='2016-04-01T19:00') April 01, 2016
                            .uk-card-body
                                p using the sign language, changed my relationship with my mom.
                                | 
                            .uk-card-footer
                                a.uk-button.uk-button-text(href='#') Read more
                    div
                        .uk-card.uk-card-default
                            .uk-card-header
                                .uk-grid-small.uk-flex-middle(uk-grid='')
                                .uk-width-auto
                                    img.uk-border-circle(width='40', height='40', src='img/elipse23.png')
                                .uk-width-expand
                                    h3.uk-card-title.uk-margin-remove-bottom Dominique
                                    p.uk-text-meta.uk-margin-remove-top
                                    time(datetime='2016-04-01T19:00') April 01, 2016
                            .uk-card-body
                                p I no longer have to search for words. I use gestures.
                                | 
                            .uk-card-footer
                                a.uk-button.uk-button-text(href='#') Read more

    //activate-section
    .uk-section.uk-background-secondary.uk-flex.uk-flex-center
        .uk-article.uk-text-center
            h2.uk-h3 Overtuigd? doe mee aan de Beta-testronde
            button.uk-button.uk-button-primary Beta test
            // button.uk-button.uk-button-primary Family
            // button.uk-button.uk-button-primary Family Pro

    //footer-section
    .uk-footer.uk-background-primary.uk-padding.uk-panel.uk-flex.uk-flex-center
            h2.uk-h4 2tango

</template>
<script>
export default {
    computed: {
        articles() {
            return this.$store.state.articles
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap');

.strongyellow{
    color: #ffffff;
}

.uk-article-meta{
    color: #fff;
}

.tm-primary {
    margin-top: -80px;
    padding: 90px 0 90px 0;
}

</style>