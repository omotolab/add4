<template>
    <div class="inset-0 flex items-center justify-center">
        <button type="button" @click="openModal"
            class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <slot name="head">
                Open dialog
            </slot>
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
                                <uikit-card :title="title" :description="description" :icon="icon" :action="action">
                                </uikit-card>
                                <slot name="body">
                                    <template v-if="!proof">
                                        <template v-if="progress === true">
                                            Payment successful
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">
                                                    Your payment has been successfully submitted. We’ve sent you
                                                    an email with all of the details of your order.
                                                </p>
                                            </div>
                                        </template>
                                        <template v-else-if="progress === false">
                                            Payment unsuccessful
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">
                                                    Your payment was unsuccessfull. We’ve sent you
                                                    an email with all of the details of the transaction.
                                                </p>
                                            </div>
                                        </template>
                                        <template v-else>
                                            Payment Almost Ready!
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">
                                                    You just have to pick a payment method.
                                                </p>
                                            </div>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <!-- <div>{{ proof }}</div> -->
                                        <link-qrcode :text="props.proof.query._links.paymentLink.href" />
                                    </template>

                                </slot>

                            </DialogTitle>


                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Got it, thanks!
                                </button>
                            </div>
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

const props = defineProps(['action', 'icon', 'title', 'description', 'progress', 'proof'])
const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>
  