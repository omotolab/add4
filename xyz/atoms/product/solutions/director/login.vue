<template lang="pug">
.uk-section.uk-section-small.uk-padding-remove-top
    ul.uk-card(class='uk-width-3-5@m').uk-list
      li
        form(@submit.prevent="")
            fieldset.uk-fieldset
                .uk-margin
                    label.uk-form-label(for='form-mode') Mode
                    div.uk-form-controls
                      select.uk-select(id='form-mode' v-model='mode')
                        option login
                        option register
                        option reset
                .uk-margin
                    h1 {{ mode }}
                    label.uk-form-label(for='form-horizontal-text') Email:
                        .uk-margin-small
                            input.uk-width-large.uk-input(v-model="email" type='text', placeholder='Email')
                .uk-margin(v-show="mode !==  'reset' ")
                    label.uk-form-label(for='form-horizontal-text') Password:
                        .uk-margin-small
                            input.uk-width-large.uk-textarea(v-model="password" type="password" placeholder='Password')
                .uk-margin(v-show="mode ===  'register' ")
                    label.uk-form-label(for='form-horizontal-text') Password confirmation:
                        .uk-margin-small
                            input.uk-width-large.uk-textarea(v-model="passwordConfirm" type="password" placeholder='Password Confirmation')
                .uk-flex.uk-flex-between.uk-margin
                  .uk-panel
                    button(v-if="mode === 'login'" @click="handleLogin").uk-button.uk-button-default
                          | Login 
                    button(v-else-if="mode === 'register'" @click="handleRegister").uk-button.uk-button-default
                          | Register
                    button(v-else-if="mode === 'reset'" @click="handleReset").uk-button.uk-button-default
                          | Reset 
                  button.uk-button-primary(v-if="$store.state.accessible" @click="goToDashboard").uk-button.uk-button-default
                      | Go to Dashboard
</template>
<script>
export default {
   layout: 'display',
   data() {
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      mode: 'login',
      reset: false,
      register: false,
      checked: false,
      redirectTo: '',
      from: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from)
    // this.from = from
    next();
  },
  mounted() {
    if(this.$route.query.mode) {
      this.mode = this.$route.query.mode
    }
  },
  methods: {
    handleRegister() {
      if(this.password === this.passwordConfirm) {
        this.$store
          .dispatch('register', {
            email: this.email,
            username: this.username,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
          })
          .then((response) => {
          if (this.$store.state.accessible) {
            console.log(this.$router)
            UIkit.notification({
              message: "You are logged in!",
              status: 'success',
              pos: 'top-right',
              timeout: 5000
            });
          }
        },
        error => {
          UIkit.notification({
              message: error,
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
          });
        })
      }

      else {
        UIkit.notification({
              message: 'Your passwords are not the same',
              status: 'warning',
              pos: 'top-right',
              timeout: 5000
          });
      }
    },
    handleLogin() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
          checked: this.checked,
        })
        .then((response) => {
          if (this.$store.state.accessible) {
            //this.$router.back()
            UIkit.notification({
              message: "You are logged in!",
              status: 'success',
              pos: 'top-right',
              timeout: 5000
            });
          }
        },
        error => {
          UIkit.notification({
              message: error,
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
          });
        })
    },
    handleReset() {
      this.$store
        .dispatch('reset', {
          email: this.email
        })
        .then((response) => {
          UIkit.notification({
              message: "A reset link has been sent. Check your email!",
              status: 'success',
              pos: 'top-right',
              timeout: 5000
          });
        },
        error => {
          UIkit.notification({
              message: error,
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
          });
        }
      )
    },
    goToDashboard() {
      this.$router.push('/dashboard/')
    }
  }

}
</script>