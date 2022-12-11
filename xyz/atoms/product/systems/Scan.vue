<template lang="pug">
div
  form(@submit.prevent)
    fieldset.uk-fieldset
      legend.uk-legend Scan
      .uk-margin
        input.uk-input(type='text' placeholder='Email')

      .uk-margin
        .js-upload(uk-form-custom)
          input(type="file" multiple="")
          button.uk-button.uk-button-default(type="button" tabindex="-1") Select
        .uk-panel
          button.uk-button.uk-button-default(type="button") Scan
  .uk-panel
    ion-item(@click="cameraActive = !cameraActive" lines="full")
      ion-avatar(slot="start")
        ion-img( :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Date.now()}`" )
      ion-label Claim a token
      ion-icon(name="add" size="small")
    ion-card( v-if="cameraActive" )
      camera-stream(
        :onStream="handleCameraStream" 
        :showOriginal="true"
        :showCanvas="false"
        :cameraConfig="cameraConfig"
        :calulationsPerSecond="24"
        :triggerActive="cameraActive"
          )

</template>
<script>
import CameraStream from './Camera'
// import checkToken from '~/assets/scripts/checkToken'

export default {
  data() {
    return {
      stream: null,
      cameraActive: false,
      cameraConfig: {
        audio: false,
        video: {
            facingMode: "environment",
            width: 1280,
            height: 720
        }
      }
    }
  },
  components: {
    CameraStream
  },
  methods: {
    handleCameraStream(stream) {
        this.stream = stream.data
        const jsQR = require('jsqr')
        const parseURI = (data) => {
          let parts = this.$$.ram.split('/', data)
          let token = parts[parts.length - 1]
          console.info("TOKEN:", token)
          // navigator.mediaDevices.getUserMedia({ video: false })
          // checkToken(token)
          this.cameraActive = false
        }
        const whenIsCode = (data) => {
          data ? parseURI(data) :
          console.warn("Reading: Bad...")
        }

        let code = jsQR(stream.data, stream.width, stream.height)
        let runParser = (code) => whenIsCode(code.data)
        code ? runParser(code) : console.log("Reading: None.") 
      },
  }
}
</script>