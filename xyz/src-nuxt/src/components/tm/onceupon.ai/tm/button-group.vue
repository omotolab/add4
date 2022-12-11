<template>
<!-- A button group with a dropdown -->
<div class="uk-button-group uk-width-1-1">
    <button class="uk-button uk-button-default uk-button-large ">
        <span uk-icon="cloud-download"></span>
    </button>
    <div class="uk-inline uk-width-expand">

        <!-- The button toggling the dropdown -->
        <button class="uk-button uk-button-default uk-button-large uk-width-expand" type="button">
            <span uk-icon="heart"></span>
        </button>
        <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
            <div>
                Hello
            </div>
        </div>

    </div>
</div>
</template>