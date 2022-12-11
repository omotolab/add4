<template lang="pug">
div
  ul
    h3 Agenda
    li(@click="submitRegistration")
      span {{ profile ? profile.uid : 'profile' }}
    li(@click="getQR")
      template(v-if="!stream")
        span {{ token ? token : 'token' }}
      template(v-else)
        qrcode-stream(v-if="stream" @decode="onDecode")
    li(@click="getLocation")  
      span {{ location ? location.lat + ', ' + location.lng : 'location' }}
    li(@click="getMessage")
      span {{ message ? message : 'message' }}
    li(@click="getCategory")
      span {{ category ? category : 'category' }}
    li(@click="submitAction")
      button Submit Action
  ul
    h3 Actions
    li(v-for="action in actions") {{ action.location }}
</template>
<script>
import scan from '@/components/scan'
import { db } from '@/assets/services'

export default {
  components: {
    scan
  },
  data() {
    return {
      stream: null,
      message: null,
      category: null,
      location: null,
      token: null,
      event: null,
      time: null
    }
  },
  created() {
    this.user = {
      name: "Omotola Bolarin",
      email: "bolarin@omoto.la",
      password: "NeuLeap3r!0R1G1N",
      password_confirmation: "NeuLeap3r!0R1G1N"
    }
  },
  computed: {
    profile() {
      return this.$store.state.activity.profile
    },
    actions() {
      return this.$store.state.activity.actions
    }
  },
  watch: {
    profile(newProfile) {
      newProfile !== null ? this.$store.dispatch('activity/bindActions') : null
    }
  },
  methods: {
    async getLocation() {
      this.location = await this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
      })
    },
    getCategory() {
      this.category = this.$store.state.settings.categories[0].name
    },
    getMessage() {
      this.message = 'I organised a workshop about foodwaste.'
    },
    getQR() {
      this.stream = true
    },
    onDecode(decodedString) {
      let code = decodedString.split('/')
      code !== "" ? this.token = code[ code.length - 1] : console.info('no data in qr')
      this.token !== null ? this.stream = false : console.info('still reading')
    },
    submitAction() {
      this.location !== null ?
      this.event = {
        location: this.location,
        category: this.category,
        message: this.message,
        token: this.token,
      } : console.warn('no location registered')

      this.event !== null && this.profile !== null ? 
      this.$store.dispatch('activity/registerAction', this.event) : 
      console.warn("no event was sent")
    },
    submitRegistration() {
      this.$store.dispatch('activity/loginUser', this.user)
    },
    
  }
}
</script>