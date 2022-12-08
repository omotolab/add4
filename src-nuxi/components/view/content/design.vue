<script setup>
import {
  PlayIcon,
  PauseIcon,
  PencilIcon,
  CheckIcon,
  BoltIcon,
  BoltSlashIcon,
  MoonIcon,
  AdjustmentsVerticalIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SunIcon, PlusIcon, PhotoIcon, MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon, EllipsisHorizontalIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon
} from '@heroicons/vue/24/solid'

const location = ref(null)
const isDark = useDark()
const toggleDark = useToggle(isDark)
const mainClass = "uk-height-viewport uk-flex uk-flex-middle uk-flex-center"
const darkClass = "uk-section uk-section-secondary"
const lightClass = "uk-section"

const viewHeight = ref()
const viewWidth = ref()
const viewSizeOptions = ['auto', 'expand', 'small', 'medium', 'large']

viewWidth.value = viewSizeOptions[3]
viewHeight.value = viewSizeOptions[2]

const { public: { mode } } = useRuntimeConfig()

const data = {
  time: Date.now(),
  version: 0,
  blocks: []
}
const core = reactive({
  editor: {
    on: false,
    hideToolbar: true,
    holder: 'editor',
    placeholder: 'Write something..',
    minHeight: 35,
    onChange,
    onReady,
    data,
  },
  viewer: {
    on: false,
    focus: 0,
    expanded: true,
  },
  speaker: {
    on: false
  },
  player: {
    on: false
  },
  generator: {
    on: false
  },
  more: {
    on: false
  }
})

const body = {
  type: 'article',
  title: 'title',
  meta: {
    description: 'description',
  },
  core
}

const auth = useLocalStorage('auth', {
  head: {
    created: Date.now(),
  },
  body,
  foot: {
    references: ['a, b']
  }
})


function onChange(event) {
  // console.log('change', event)
}

function onReady({ editor }) {
  // author.value = editor
  console.log('ready')
}

function handleSwitch(i) {
  console.log('i', i.target.innerText)
}

function handleTitleUpdate(i) {
  body.value.title = i.target.innerText
}

function handleDescriptionUpdate(i) {
  body.value.description = i.target.innerText
}

function handleContentUpdate(outputData) {
  body.value.content = outputData
}

function handleSave() {
  author.value.save().then(handleSuccess).catch(handleError);

  async function handleSuccess(outputData) {
    const config = useRuntimeConfig()
    handleContentUpdate(outputData)

    const { data, error } = await useFetch('api', {
      key: JSON.stringify(Date.now()),
      method: 'post',
      body: body.value
    })

    if (!data) {
      console.warn(error)
    } else {
      // alert(JSON.stringify(data))
      // await useStorage().setItem('storage', data)
      // store.value = await useStorage().getItem('storage')

      console.log('store', data.value)
    }

    // console.log('res', response)

  }

  function handleError(error) {
    console.log('Saving failed: ', error)
  }
}

function handleFocus({ value }) {
  core.viewer.focus = value
}

onMounted(() => {
  location.value = window.location.hostname
})

</script>
<template>
  <div :class="`${mainClass} ${isDark ? darkClass : lightClass}`">
    <div class="text-red-400 dark:text-green-400">

      <div class="uk-margin shadow-md uk-card uk-card-small  bg-white ">
        <!-- <div class="uk-card-body uk-width-medium uk-height-small uk-overflow-auto">
          <div class="uk-margin uk-text-center">
            <div class="uk-text-large">Unwelcome</div>
            <div class="uk-margin-small">This page is empty.</div>
            <div class="uk-text-meta">{{ core.viewer.focus }}</div>
          </div>

        </div>
        <hr class="uk-margin-remove" />
        <div class="uk-card-body uk-width-medium uk-overflow-none">
          <div class="uk-grid uk-grid-small uk-flex-middle uk-flex-center uk-flex-between" uk-grid="masonry: true">
            <div class="uk-width-auto">
              <ul class="uk-iconnav uk-flex uk-flex-center">
                <li>
                  <to-button class="uk-button-default" :action="() => toggleDark()">
                    <sun-icon style="height: 20px" v-if="isDark" />
                    <moon-icon style="height: 20px" v-else />
                  </to-button>
                </li>
                <li>
                  <span class="uk-icon-button" @click="core.editor.on = !core.editor.on">
                    <CheckIcon v-show="core.editor.on" style="height: 18px" />
                    <PencilIcon v-show="!core.editor.on" style="height: 18px" />
                  </span>
                </li>
                <li>
                  <toggle />
                </li>
                <li>
                  <span class="uk-icon-button" @click="core.editor.on = !core.editor.on">
                    <CheckIcon v-show="core.editor.on" style="height: 18px" />
                    <PencilIcon v-show="!core.editor.on" style="height: 18px" />
                  </span>
                </li>

                <li>
                  <span class="uk-icon-button" @click="core.viewer.expanded = !core.viewer.expanded">
                    <ArrowsPointingInIcon v-show="core.viewer.expanded" style="height: 18px" />
                    <ArrowsPointingOutIcon v-show="!core.viewer.expanded" style="height: 18px" />
                  </span>
                </li>
                <li>
                  <span class="uk-icon-button" @click="core.player.on = !core.player.on">
                    <PlayIcon v-show="core.player.on" style="height: 18px" />
                    <PauseIcon v-show="!core.player.on" style="height: 18px" />
                  </span>
                </li>
                <li>
                  <span class="uk-icon-button" @click="core.speaker.on = !core.speaker.on">
                    <SpeakerWaveIcon v-show="core.speaker.on" style="height: 18px" />
                    <SpeakerXMarkIcon v-show="!core.speaker.on" style="height: 18px" />
                  </span>
                </li>
                <li>
                  <to-button class="uk-width-small"></to-button>
                </li>
              </ul>
            </div>


          </div>
        </div>
        <hr class="uk-margin-remove" /> -->


        <div class="uk-flex uk-flex-between uk-flex-middle">

          <div class="uk-margin-small-left uk-width-expand">
            <div v-show="!core.more.on" class="uk-grid uk-grid-small">
              <div>
                <ul class="uk-iconnav">
                  <li>
                    <to-button :action="() => core.generator.on = !core.generator.on"
                      :class="` ${core.generator.on ? 'uk-button-secondary' : ''}`">
                      <BoltIcon v-show="core.generator.on" style="height: 18px" class="uk-inline " />
                      <BoltSlashIcon v-show="!core.generator.on" style="height: 18px" class="uk-inline" />
                    </to-button>
                  </li>
                </ul>
              </div>
              <div class="uk-width-expand">
                <ul class="uk-iconnav uk-grid uk-flex uk-flex-between">
                 
                  <li class="uk-width-expand">
                    <to-button :class="'uk-width-expand'">
                      <SpeakerWaveIcon style="height: 20px" />
                    </to-button>
                  </li>
                  <li class="uk-width-expand">
                    <to-button :class="'uk-width-expand'">
                      <PhotoIcon style="height: 24px" />
                    </to-button>
                  </li>
                </ul>
              </div>
            </div>

            <div v-show="core.more.on">
              <ul class="uk-iconnav">
                <li class="uk-width-auto" v-for="value in 2" :key="value">
                  <to-button :action="() => handleFocus({ value })">
                    <div class="uk-text-meta">{{ value }}</div>
                  </to-button>
                </li>
              </ul>
            </div>
          </div>
          <div style="margin: 5px">
            <div v-show="core.generator.on">
              <to-button :action="() => handleFocus({ value })">
                <AdjustmentsVerticalIcon style="height: 18px" />
              </to-button>
            </div>
            <div v-show="!core.generator.on">
              <to-button :action="() => core.more.on = !core.more.on" class="uk-button-default">
                <PlusIcon v-show="core.more.on" style="height: 18px" />
                <EllipsisHorizontalIcon v-show="!core.more.on" style="height: 18px" />
              </to-button>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="uk-card uk-card-small">
        <div class="shadow-md bg-white bg-white hover:shadow">
          <view-header class="uk-card-header" />
          <view-content class="uk-card-body" :core="core.content"
            :class="`uk-width-${viewWidth} uk-height-${viewHeight} uk-overflow-auto`">
            <view-content-editor :settings="core" class="uk-width-expand " /> 
            {{ data }}
          </view-content>
        </div>
        <div class="uk-paddding-remove uk-margin-remove shadow-inner">
          <view-content class="uk-card-body " :core="core"
            :class="`uk-width-${viewWidth} uk-height-${viewHeight} uk-overflow-auto`">
            <view-content-editor :settings="core" class="uk-width-expand " />
          </view-content>
          <view-footer class="uk-card-footer">
            <div>v {{ data.version }}</div>
            <div class="uk-grid uk-grid-collapse uk-flex uk-flex-between">
              <div>
                <ul class="uk-iconnav">
                  <li>
                    <to-button>
                      <span uk-icon="plus"></span>
                    </to-button>
                  </li>
                  <li v-for="(block, b) in data.blocks" :key="b">
                    <div>{{ b }}</div>
                  </li>
                </ul>
              </div>

              <div>{{ data.time }}
                <to-button></to-button>
              </div>
            </div>

            <div class="uk-text-small">Copyright 2022</div>
          </view-footer>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style>
.uk-iconnav>* {
  padding-left: 5px;
}

.uk-margin-small-left {
  margin-left: 10px !important;
}
</style>