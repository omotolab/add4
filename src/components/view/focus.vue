<template>
    <div class="inset-0 flex items-center justify-center">
        <button type="button" @click="openModal"
            class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <slot>Open dialog</slot>
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                <slot name="header">Focus Mode</slot>
                            </DialogTitle>
                        
                             <template v-if="!isDone">
                                <slot name="tick">
                                    <div class="mt-2" >
                                    
                                    <p class="text-sm text-gray-500">
                                        You are about to checkout. Once you have made your payment,
                                        we will send you an email with all of the details of your order.
                                       
                                    </p>
                                </div>
                                </slot >

                             </template>
                             <template v-else>
                                <slot name="tock">
                                                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order. You can also save the details now.
                                    </p>
                                </div>

                                </slot>
                             </template>
                                                             
                                
                               
                        
                            <ul class="uk-iconnav ">
                                <li class="mt-4">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                        <slot name="primary">Continue</slot>
                                    </button>
                                </li>
                                <li class="mt-4">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        @click="toggleDone">
                                        <slot name="secondary">
                                            <CheckBadgeIcon class="h-20px"/>

                                        </slot>
                                    </button>
                                </li>
                            </ul>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { useToggle } from '@vueuse/core'
import { BoltIcon as BoltIconOutline } from '@heroicons/vue/24/outline'
import { CheckBadgeIcon, CheckCircleIcon, ShieldCheckIcon, CheckIcon } from '@heroicons/vue/24/solid'

const isOpen = ref(true)
const isDone = ref(false)
const toggleDone = useToggle(isDone)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>
  