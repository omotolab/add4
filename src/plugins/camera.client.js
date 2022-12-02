
import { Html5QrcodeScanner } from "html5-qrcode"

const defaultSettings = { fps: 10, qrbox: { width: 250, height: 250 } }

export default defineNuxtPlugin(() => {
    return {
        provide: {
            camera: function({ reader, settings }) {
                if(!settings) {
                    return new Html5QrcodeScanner(reader, defaultSettings, false)
                } else {
                    const combineSettings = {
                        ...defaultSettings,
                        ...settings
                    }
                    return new Html5QrcodeScanner(reader, combineSettings, false)
                }
            }
        }
    }
})