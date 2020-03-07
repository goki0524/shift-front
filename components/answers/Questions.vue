<template>
  <div>
    <v-stepper v-model="stepper">
      <v-stepper-content step="1" class="mb-10 stepper">
        <QuestionItems :stepper="stepper"/>
      </v-stepper-content>
      <v-stepper-content step="2" class="mb-10 stepper">
        <QuestionItems :stepper="stepper"/>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<style scoped>
.stepper {
  padding: 0px;
}
</style>

<script>
  import QuestionItems from '~/components/answers/QuestionItems.vue'
  export default {
    components: {
      QuestionItems,
    },
    data() {
      return {
        stepper: 1,
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>