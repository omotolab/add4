<template lang="pug">
div
    h1.uk-margin-top  Activitites Overview
    .uk-flex(uk-grid)
        ul(uk-switcher).uk-width-medium.uk-list
            li(v-for="(item, i) in list")
                a(href="#")
                    task(
                        :title="item.title",
                        :description="item.description",
                        :children="item.children"
                    )
        ul.uk-switcher.uk-background-muted.uk-width-expand
            li(v-for="(item, i) in list")
                p {{ item }}

</template>

<script>
import { activities } from "~/constants/activities";
export default {
  layout: 'dashboard',
  data: () => ({
    list: activities,
  }),
};
</script>