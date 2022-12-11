
<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const {
  label, content, description, action
} = defineProps({
  label: String,
  title: String,
  description: String,
  content: String,
  action: String,
  modelValue: String,
})

const isOpen = ref(false)
const input = ref(null)


const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  const text = event.target.innerText
  emit('update:modelValue', text)
  nextTick(() => {
    console.log('setting position', input)
    setCursorPosition(input.value, text.length)
  })
}

function setCursorPosition(el, pos) {
  el.focus();
  // console.log('setting position', input.value)
  // el.setSelectionRange(pos, pos);
}

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

</script>
  
<template>
  <div class="inset-0 flex items-center ">

    <!-- <div class="w-full">
      <div class="mr-10">
       <p contenteditable class="text-md w-auto max-w-md transform overflow-hidden rounded-lg bg-white p-2 m-2 text-left align-middle shadow-xl transition-all">
          {{ content }}
        </p>
      </div>
      <div class="ml-10">
       <p contenteditable class="text-md w-auto max-w-md transform overflow-hidden rounded-lg bg-white p-2 m-2 text-left align-middle shadow-xl transition-all">
          {{ content }}
        </p>
      </div>
      <div class="w-full">

       <textarea class="m-1 p-2 " v-model="content"/>
      </div>
      <div class="text-right">
        
      </div>
    </div> -->
    <button v-if="label" type="button" @click="openModal"
        class="self-end rounded-md bg-black bg-opacity-20 mx-2 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {{ label }}
      </button>

    <button v-else type="button" @click="openModal" class="w-full">
      <slot name="trigger">
        {{ label }}
      </slot>

    </button>


  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed bg-black inset-0 bg-opacity-80" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full justify-center p-1">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">

            <DialogPanel
              class="w-full transform overflow-hidden rounded-lg  min-h-38 max-h-90 p-2 text-left align-top shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white pt-2 pl-2 flex justify-between items-center">
                <div>
                  {{ title }}
                </div>

                <div class="text-right mt-2">
                  <button type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal">
                    {{ action }}
                  </button>
                </div>
              </DialogTitle>
              <slot name="modal">

                <div class="w-full max-h-59 bg-white rounded-lg overflow-auto">
                  <span>{{ modelValue }}</span>
                  <p ref="input" class="text-md text-gray-500 editable h-auto mb-2 p-2" contenteditable
                    @input="updateValue" placeholder="Hello message">{{ modelValue }}</p>
                </div>

              </slot>




            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style>
:focus-visible {
  outline: 2px dotted #333;
}
</style>