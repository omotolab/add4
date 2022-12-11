<script setup>
useHead({
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>
<template>
    <cover class="flex justify-center items-center h-screen w-screen ">
        <div class="uk-container">
            <div class="uk-flex uk-flex-around">
                <div class="uk-card uk-card-small uk-background-muted uk-border-rounded uk-width-large">
                    <div class="uk-width-1-1">
                        <div class="uk-card-header uk-card-hover">
                            <div class="uk-flex uk-flex-between">
                                <div>Title</div>
                                <div>
                                    <a href="#hello" uk-toggle="target: #mini" type="button">
                                        <span uk-icon="expand"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr class="uk-padding-remove uk-margin-remove">
                        <div class="tm uk-card-body uk-card-small">
                            <div class="uk-width-1-1 uk-height-small">
                                <pre contenteditable="true" class=" editable">Hello</pre>
                                <ul class="uk-text-small uk-iconnav uk-margin-small-top">
                                    <li>
                                        <a class="uk-icon-button uk-width-auto uk-border-rounded">
                                            Send
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- This is the modal -->
        <div id="mini" class="uk-modal-full" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body" uk-height-viewport="offset-top; true; offset-bottom: true">
                    <div>Hello Content</div>
                </div>
                <div class="uk-modal-footer">
                    <div>Hello Footer</div>
                </div>
            </div>
        </div>


    </cover>
</template>