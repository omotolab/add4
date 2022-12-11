<template lang="pug">
div(uk-sticky='position: bottom;')
    div.uk-overlay.uk-overlay-default.uk-position-bottom.uk-text-center.uk-remove-padding(uk-alert='')
        a.uk-alert-close(uk-close='')
        h3 Do you accept Cookies?
        .uk-button.uk-button-primary Accept
        nuxt-link.uk-button(to="/legal/cookies").uk-link-muted read them
</template>