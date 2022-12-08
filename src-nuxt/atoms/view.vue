<script>
import EditorJS from '@editorjs/editorjs';
import { LockClosedIcon } from '@heroicons/vue/24/solid'
const { value: { hostname, href } } = useBrowserLocation()
const editor = new EditorJS();
</script>
<template>
    <client-only>
        <cover class="h-screen w-screen ">
            <slot>
                <use-qrcode :text="href" />
            </slot>
        </cover>
    </client-only>
</template>