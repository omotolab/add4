<template>
    <div class="uk-background-muted" uk-height-viewport>
        <div class="uk-card uk-card-small">
            <div class="uk-card uk-card-default uk-card-header">
                <div class="uk-height-medium">

                </div>
                <div class="uk-flex uk-flex-between uk-flex-middle">
                    <div>
                        <strong class="uk-text-small">2Tango Signs</strong>
                        <div class="uk-text-meta">Gesture Library</div>
                    </div>
                    <div>
                        <button class="uk-icon-button uk-border-rounded">
                            <span uk-icon="chevron-down"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="uk-card-media uk-overflow-auto">
                <slot></slot>
            </div>
            <div class="uk-card uk-card-footer uk-text-meta">
                Hello
            </div>
        </div>
    </div>
</template>