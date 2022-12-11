  
  <script setup>
  import { ref } from 'vue'
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  } from '@headlessui/vue'
  
  const props = defineProps(['modelValue', 'options'])
  const emits = defineEmits(['update:modelValue'])
  const plans = [
    {
      name: 'Startup',
      ram: '12GB',
      cpus: '6 CPUs',
      disk: '160 GB SSD disk',
    },
    {
      name: 'Business',
      ram: '16GB',
      cpus: '8 CPUs',
      disk: '512 GB SSD disk',
    }
  ]
  
  const selected = ref(props.options[0])
  </script>
<template>
    <div class="w-full my-4">
      <div class="mx-auto w-full max-w-md">
        <RadioGroup v-model="selected" @update:model-value="(i) => emits('update:modelValue', i)">
          <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
          <div class="space-y-2">
            <RadioGroupOption
              as="template"
              v-for="plan in props.options"
              :key="plan.name"
              :value="plan"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? ' '
                    : '',
                  checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
                ]"
                class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
              >
                <div class="flex w-full items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ plan.name }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        :class="checked ? 'text-sky-100' : 'text-gray-500'"
                        class="inline"
                      >
                        <span> {{ plan.ram }}/{{ plan.cpus }}</span>
                        <span aria-hidden="true"> &middot; </span>
                        <span>{{ plan.disk }}</span>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div v-show="checked" class="shrink-0 text-white">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="#fff"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    </div>
  </template>

  