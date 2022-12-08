import EditorJS from '@editorjs/editorjs'
const defaultSettings = {
    holder: 'editor',
    hideToolbar: true,
    placeholder: 'Write something...',
    data: {
        time: Date.now(),
        version: 0,
        blocks: [{
            type: 'paragraph'
        }]
    },
    i18n: {
        messages: {
          ui: {
            // Translations of internal UI components of the editor.js core
          },
          toolNames: {
            // Section for translation Tool Names: both block and inline tools
          },
          tools: {
            // Section for passing translations to the external tools classes
            // The first-level keys of this object should be equal of keys ot the 'tools' property of EditorConfig
          },
          blockTunes: {
            // Section allows to translate Block Tunes
          },
        }
      }
}
export default defineNuxtPlugin(() => {
    return {
        provide: {
            editor: function(settings) {
              
                if(!settings) {
                    return new EditorJS(defaultSettings)
                } else {
                    const combineSettings = {
                        ...defaultSettings,
                        ...settings
                    }
                    console.log('setup', combineSettings)
                    return new EditorJS(combineSettings)
                }
            }
        }
    }
})