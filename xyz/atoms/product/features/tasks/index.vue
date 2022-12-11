<template lang="pug">
div.uk-section.uk-section-small
  .uk-card.uk-card-body
    .uk-flex.uk-grid.uk-grid-collapse
      div.uk-width-large
        textarea-growable(
          id="statement" 
          name="statement" 
          v-model="statement" 
          placeholder="Make a statement")
      // hr.uk-divider-vertical.uk-margin-left
      div.uk-width-auto
        textarea(placeholder="How are we going to get you all through these things that we see coming.").uk-textarea.uk-form-blank
        input(placeholder="#faith #in #action").uk-input.uk-form-blank
    // ul.uk-list.uk-list-small.uk-margin-small-left.uk-margin-small-right
      li(v-for="route in $router.options.routes") 
        n-link(:to="route.path")
          .uk-width-medium.uk-placeholder.uk-margin-remove {{ route.name }}
</template>