<template>
    <div class="flex flex-col items-center justify-center h-screen" >
        <!-- <slot name="header">
            <div class="uk-card-header">
                <div>Header</div>
                <div class="uk-height-small"></div>
            </div>
        </slot> -->
        <slot></slot>
        <!-- <slot>
        <div class="uk-flex uk-flex-center uk-flex-middle uk-flex-column" uk-height-viewport="offset-bottom: true; offset-top: true">
           cover.vue
        </div>
        </slot> -->
        <!-- <slot name="footer">
            <div class="uk-card-default uk-card-footer">
                <div>Footer</div>
                <div class="uk-height-medium"></div>
            </div>
            
        </slot> -->
    </div>
</template>