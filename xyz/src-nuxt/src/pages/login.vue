<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-middle.uk-flex-center
    .uk-card.uk-card-default
        .uk-card-body
            // article
                h1
            // form
                input(placeholder="Phone Number").uk-input.uk-form-large
                input(placeholder="Email").uk-input.uk-form-large
                input(type="submit").uk-button
            button(@click="() => $auth.loginWith('google')")
                span(uk-icon="google")
                span Login with Google
</template>