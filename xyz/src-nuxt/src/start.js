import { h } from 'vue'
// import getGraph from 'gun'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()

// const network = getGraph('http://localhost:8765/gun')

/* Constants */
// const $time = network.get('time')

// $time.on($tick)

/* Methods */
function $tick(e) {
  console.log('EVENT', e)
}

const atoms = [
  {
    type: 'a',
    props: {
      href: 'https://vitejs.dev',
      target: '_blank',
    },
    children: [
      {
        type: 'img',
        props: {
          src: '/vite.svg',
          alt: 'Vite logo',
          class: 'logo',
        },
      },
    ],
  },
  {
    type: 'a',
    props: {
      href: 'https://vuejs.org/',
      target: '_blank',
    },
    children: [
      {
        type: 'img',
        props: {
          src: './assets/vue.svg',
          class: 'logo',
          alt: 'Vue logo',
        },
      },
    ],
  },
]

const content = ({ value }) => h('pre', [
  value,
  h(Message),
  'a',
  'ok now?',
])

const action = ({ value }) => h('button', {
  id: 'log-value',
  onClick: (clickEvent) => {
    console.log(value)
    console.log('click event', clickEvent)
  },
  innerHTML: 'Click me',
})

function Prompt({ message }) {
  return [
    content({
      value: message,
    }),
    action({
      value: Date.now(),
    }),
  ]
}

function Message(props, context) {
    console.log('props', props)
    console.log('conte', context)
    return 'hello world'
}

const setup = function () {
  const route = useRoute()
  function enableCustomLayout () {
    route.meta.layout = "studio"
  }
  definePageMeta({
    layout: false,
  });

  useHead({
    title: '™',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/nuxt.png',
      },
    ],
    script: () => {
      if(process.env.NODE_ENV === 'production') {
        return [
          { 'defer': true, 'data-domain': 'onceupon.ai', 'src': 'https://plausible.io/js/plausible.js' },
        ]
      }
    }
  })

  const count = 0
  const message = `You have clicked ${count} times.`
  const addCount = n => count.value + n
  const subtractCount = n => count.value - n

  return {
    count,
    message,
    addCount,
    subtractCount,
  }
}

const render = function () {
  return [
    h(Prompt),
    h(Message),
  ]
}

export default {
  setup,
  render,
}
