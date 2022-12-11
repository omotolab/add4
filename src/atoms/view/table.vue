<script>
export default {
  props: {
    model: {
      type: Array,
      default: () => [
        [
          'timestamp',
          'spin',
          'latitude',
          'longitude',
          'accuracy'
        ],
        [
          [Date.now(),0,0,0,0]
        ]
      ]
    }
  }
}
</script>
<template lang="pug">
table.uk-table.uk-table-striped
  tr
    th(v-for="(attribute, attributeIndex) in model[0]" :key="attributeIndex") {{ attribute }}
  tr( v-for="(entry, entryIndex) in model[1]" :key="entryIndex")
    td(v-for="(value, valueIndex) in entry" :key="valueIndex" ) {{ value }}
</template>