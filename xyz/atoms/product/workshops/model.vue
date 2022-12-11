<template lang="pug">
.form 
  a-form(@submit="handleSubmit")
    a-form-item(v-for="(entry, e) in $data" :key="e"  :label="e" :label-col="{ span: 5 }")
      a-input(
        type='text'
        :name="e"
        v-model="e"
        style="width: 63%; margin-right: 2%;")
    a-form-item
      a-button(type="primary" html-type="submit") 
        | Submit
</template>
<style>
.ant-form-item {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum', "tnum";
    margin-bottom: 8px;
    vertical-align: top;
}
</style>
<script>

export default {
  data: () => ({
      topic: 'food',
      context: 'food-industry',
      timeframe: [Date.now(), 1],
      medium: 'food',
      result: 'Foto series of future food dish, that start a discussion about a food (issue?) and related conflict or dilemma.',
      goal: 'teaching a way to look at the problem through using food as creative medium to express it.',
      target: '12-15',
      duration: '2 hours',
      client: 'SKVR + Highschool',
      tools: [
        'DSLR Camera',
        'Paper A2',
        'Tableware',
        'Food',
        'Cutting Board'
      ],
      location: 'SKVR',
      room: 'Normal Classroom',
      presentation: {
        slides: []
      }
  }),
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const elements =  Array.from(e.target.elements)

      /* const newWorkshopValues = elements.map((e)=>{
        return e.value
      }) */

      /* const newWorkshop = elements.map((element)=>({
        [element.name]: element.value,
      })) */
      this.$emit('submitted', this.$data)
    },
  }
}
</script>