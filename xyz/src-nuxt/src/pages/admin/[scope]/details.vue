<template lang="pug">
div.uk-container.uk-light.uk-flex.uk-flex-center
    div(class="uk-width-medium uk-width-large@s").uk-section.uk-section-small
        .uk-flex.uk-flex-center
            nuxt-link(to="/")
                tm-marli-logo(src="/logo.svg")
        template(v-if="lsent")
            article.uk-text-center.uk-margin-large
                h2.uk-h2.uk-margin-large
                    span Almost there
                p You are now registered! To login, click on the confirmation link in the email we have just sent to you.
                p If you don't receive the email within a few minutes, make sure it didn't end in the spam folder.
                p You also can let us resend the login email by going to the login page and clicking the "Send Login Link".
        template(v-else-if="state")
            article.uk-text-center.uk-margin-large
                div You are logged in as: {{ state.email }}
                a(@click="handleSignOut") Sign Out
                h2.uk-h2.uk-margin-large Talk to Marli
                p Select the statements that are true to you.
                .uk-card.uk-card-primary.uk-text-left
                    .uk-card-body
                        ul.uk-list.uk-list-large.uk-margin-remove
                            li I need to find tickets last minute.
                            li I want to know as soon as tickets are on sale.
                            li I wish I didn't miss an event this year.
                            li I wish I didn't buy tickets for an event this year.
                            li I want to reserve tickets for next year.
                            li I want to buy tickets early to resell.
                            li I want to find the best price for me and my friends.
                            li I want to know when an event with my favorite artists is in town.
                            li I want to know when an event at my favorite venue is happening.
        template(v-else-if="!loading")
            article.uk-text-center.uk-margin-large
                template(v-if="known")
                    h2.uk-h3.uk-margin-large
                        span Login with a link
                    .uk-flex.uk-flex-center
                        figure
                            img(src="https://via.placeholder.com/154")
                    form(@submit.prevent="handleEmailCheck").uk-form.uk-margin
                        fieldset.uk-fieldset
                            label.uk-form-label Email Address
                            input(type="email" v-model="email" ).uk-input.uk-form-large.uk-margin-small
                        fieldset.uk-fieldset
                            input(type="submit" value="Send Login Link").uk-button.uk-button-primary.uk-button-large.uk-width-1-1
                        .uk-text-center.uk-margin
                            a(href="#register" @click="known = false")  I don't have an account
                template(v-else)
                    h2.uk-h3.uk-margin-large
                        span(v-show="!known && !message") Create an account
                        div(v-show="message")   {{ message }}
                        span(v-show="known") Login with a link
                    form(@submit.prevent="handleKnownSubmission").uk-form.uk-margin
                        fieldset.uk-fieldset
                            label.uk-form-label Email Address
                            input(type="email" v-model="email" ).uk-input.uk-form-large.uk-margin-small
                        fieldset.uk-fieldset.uk-margin
                            label.uk-form-label First & Last Name
                            label.uk-form-label.uk-hidden First Name 
                            input(v-model="fname").uk-input.uk-form-large.uk-margin-small
                            label.uk-form-label.uk-hidden Last Name
                            input(v-model="lname").uk-input.uk-form-large
                        fieldset.uk-fieldset
                            input(type="submit" value="Create your free account" ).uk-button.uk-button-primary.uk-button-large.uk-width-1-1
                        .uk-text-center.uk-margin
                            a(href="#login" @click="known = true") I already have an account

</template>
<script>
import { 
    getAuth, 
    signOut,
    onAuthStateChanged,
    isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail
 } from "firebase/auth";

// const auth = getAuth()


export default {
    data() {
        return {
            email: null,
            fname: null,
            lname: null,
            bdate: null,
            state: null,
            known: true,
            lsent: false,
            loading: true
        }
    },
    methods: {
        async handleEmailCheck() {
            const { email } = this
            const response = await this.$axios.$post('/api/subscribe', { 
                email,
                check: true
            })
            this.known = response.status === 'subscribed'
            this.message = "What's your name?"
        },
        async handleNewSubmission() {
            const { email, fname, lname, bdate } = this
            const response = await this.$axios.$post('/api/subscribe', { email, fname, lname, bdate })
            this.known = response.status === 'subscribed'
        },
        async handleKnownSubmission() {
            const { email, $fire: { auth }} = this
            const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: window.location.href + '/account',
                // This must be true.
                handleCodeInApp: true
            };
            sendSignInLinkToEmail(auth, email, actionCodeSettings)
                .then(() => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', email);
                    this.lsent = true
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                });
        },
        async handleSignOut() {
            signOut(this.auth).then(() => {
            // Sign-out successful.
            console.log('signed out')
            this.state = null
            }).catch((error) => {
            // An error happened.
            });
        }
    },
    computed: {
        auth() {
            return getAuth()
        },
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            this.loading = false
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                this.state = user
                this.$router.push('account')
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

        const isLinked = isSignInWithEmailLink(auth, window.location.href)
        if ( !this.state && isLinked) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
           
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
                this.state = result.user
                // this.$auth.setUser(result.user)
                
                })
                .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                    console.log('err', error)
                });
            }
    }
}
</script>