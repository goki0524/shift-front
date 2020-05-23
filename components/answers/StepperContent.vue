<template>
  <v-stepper-content :step="step" class="mb-10 stepper">
    <QuestionItems/>
  </v-stepper-content>
</template>

<script>
import QuestionItems from '~/components/answers/QuestionItems.vue'
export default {
  components: {
    QuestionItems,
  },
  props: {
    step: Number,
  },
}
</script>