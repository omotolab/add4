<script setup>
const auth = reactive({
  name: '',
  email: ''
})
</script>
<template>
  <div>
    <div class="uk-container uk-margin-small-top">
      <view-form>
        <FormKit type="form" action="/author" :config="{ validationVisibility: 'submit' }">
          <FormKit type="text" name="name" label="Name" v-model="auth.name" validation="required|length:3" help="Enter your full name." />
          <FormKit type="email" name="email" label="Email" v-model="auth.email" validation="required|length:3" help="Enter your email address." />
        </FormKit>
      </view-form>
      <hr />
      <!-- <view-form>
        <FormKit type="date" label="Start" validation="required|date_after:2022-12-01 19:15:00"
          :validation-messages="{ date_between: 'Only for those born in the 90s.' }" help="Enter your date of birth" />
        <FormKit type="date" label="Finish" validation="required|date_before:2022-12-31 00:00:00"
          :validation-messages="{ date_between: 'Only for those born in the 90s.' }" help="Enter your date of birth" />
        <hr />
        <FormKit type="select" label="Package" />
        <FormKit type="text" label="Power" validation="required|number|between:20,50" validation-visibility="live"
          help="Enter a number between 20 and 50." />
        <hr />
        <FormKit type="text" label="Title" placeholder="Exercise Title" />
        <FormKit type="textarea" label="Description" placeholder="Exercise Description" />
      </view-form> -->

      <view-content>
        <view-entry>Hello</view-entry>
      </view-content>
    </div>
  </div>

</template>