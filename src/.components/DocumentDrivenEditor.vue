<script>
export default {
    props: ['modelValue'],
    data() {
        return {
            holder: 'holder',
            editor: null,
            index: null,
            output: [],
        }
    },
    methods: {
        onReady() {
            const element = document.getElementsByClassName('codex-editor__redactor')[0]
            console.log('Editor.js is ready to work!', element)
            element.style = `padding: 0`
        },
        onChange(api, event) {
            this.index = event.detail.index
            this.editor.save().then(this.onSave).catch((error) => {
                console.log('Saving failed: ', error)
            });
        },
        onSave(outputData) {
            this.$emit('update:modelValue', {
                ...outputData,
                blocks: outputData.blocks.map(block => ({
                    ...block,
                    data: {
                        ...block.data,
                        text: block.data.text.replace('&nbsp;', '')
                    }
                }))
            })
        }
    },
    mounted() {
        console.log('value', this.modelValue)
       if (!this.modelValue) {
            this.editor = this.$editor({
                holder: this.holder,
                placeholder: 'Let`s write an awesome story!',
                onReady: this.onReady,
                onChange: this.onChange
            })
        } else {
            this.editor = this.$editor({
                holder: this.holder,
                data: this.modelValue,
                placeholder: 'Let`s write an awesome story!',
                onReady: this.onReady,
                onChange: this.onChange
            })
        }

    }
}
</script>

<template>
    <div>
        <div :id="holder" class=""></div>
    </div>


</template>
<style>
.ce-toolbar {
    position: fixed;
    display: none;
    margin-top: 3.7rem;
    margin-left: 0.5rem;
    z-index: 1000
}
</style>