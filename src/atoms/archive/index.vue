<template>
  <div class="uk-flex">
      <div class="uk-width-xlarge">
          <tree :content="content" class="uk-height-1-1"/>
      </div>
      <div class="uk-section uk-section-muted uk-height-viewport uk-width-1-1">
          <div class="uk-container uk-height-1-1">
              <div class="uk-container-small uk-margin-auto">
                  <div id="editor-container" class="uk-card uk-card-small ">
                      <!--  <div class="uk-card-header uk-text-small">Meta title</div> -->
                      <div class="uk-card-default uk-card-body">
                          <div class="uk-section">
                              <mini-editor @change="handleChange" @mounted="setEditor" :onReady="handleReady"
                                  :blocks="content" />
                          </div>
                      </div>
                      <div class="uk-card uk-card-default uk-card-footer uk-position-z-index" ref="footer">
                          <div v-show="showPanel">You want to do something special...</div>
                          <div v-show="!showPanel" class="uk-grid uk-flex uk-flex-between uk-flex-middle">
                              <div>
                                  <span>Nothing to see here.</span>
                              </div>
                              <div>
                                  <ul class="uk-iconnav uk-flex uk-flex-middle">
                                      <!-- <li>
                                      <a class="uk-icon-button uk-border-rounded">
                                          <span uk-icon="lock"></span>
                                      </a>
                                  </li> -->
                                      <li>
                                          <a class="uk-icon-button uk-border-rounded">
                                              <span uk-icon="check" @click="handleSave"></span>
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!--   <div class="uk-section uk-section-small uk-section-default uk-height-viewport">
          <div class="uk-container">
              <div class="uk-container-small uk-margin-auto">
                  <div class="uk-flex uk-child-width-1-3" uk-grid="masonry: true">
                      <div v-for="block in content.blocks" :key="block.id">
                          <div class="uk-card uk-card-small uk-background-muted uk-card-hover">
                              <div class="uk-card-body">
                                  <div :class="`${block.type}`">
                                      {{ block.data }}
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div> -->
  </div>
</template>
<script>
export default {
  data: () => ({
      showPanel: false,
      editor: null,
      content: {},
      value: null
  }),
  methods: {
      setEditor(i) {
          this.editor = i
      },
      handleChange(change) {
          this.showPanel = change.text.includes("...")
          console.log('change', change, api)
      },
      handleReady(i) {
          this.$ui.sticky(this.$refs.footer, {
              position: 'bottom',
              end: '.uk-container',
              start: '.uk-card-header',
              bottom: true
          })
      },
      handleSave() {
          this.editor.save().then(async (outputData) => {
              console.log('Article data: ', outputData)
              ddeeeeeeeeeelocalStorage.setItem('content', JSON.stringify(outputData))
              this.content = outputData
          }).catch((error) => {
              console.log('Saving failed: ', error)
          });
      },
      onChange(updatedContent, previousContent, { contentErrors, patchResult }) {
          // content is an object { json: JSONData } | { text: string }
          console.log('onChange', { updatedContent, previousContent, contentErrors, patchResult })
          this.content = updatedContent
      }
  },
  mounted() {}
}
</script>