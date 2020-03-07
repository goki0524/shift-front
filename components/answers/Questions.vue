<template>
  <div>
    <div v-if="!isStart" class="start">

      <v-row justify="center">
        <h2 class="start-text">アンケートをはじめる</h2>
        <v-btn color="teal" dark  @click="start()">アンケートを開始する</v-btn>
      </v-row>
           
    </div>

    <div v-else>
      <v-stepper v-model="stepper">
        <v-stepper-content step="1" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="2" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="3" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="4" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="5" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="6" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="7" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="8" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="9" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="10" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="11" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="12" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="13" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="14" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="15" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="16" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="17" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="18" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="19" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="20" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="21" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="22" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="23" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="24" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="25" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="26" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="27" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="28" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="29" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="30" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="31" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="32" class="mb-10 stepper">
          <QuestionItems/>
        </v-stepper-content>
        <v-stepper-content step="33" class="mb-10 stepper">
          <v-row justify="center">
            <h2>ご回答ありがとうございました</h2>
          </v-row>
        </v-stepper-content>
      </v-stepper>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  padding: 0px;
}
.start {
  height: 500px;
}
.start-text {
  margin-top: 50px;
}
</style>

<script>
  import { mapGetters } from 'vuex'
  import QuestionItems from '~/components/answers/QuestionItems.vue'

  export default {
    components: {
      QuestionItems,
    },
    data() {
      return {
        isStart: false
      }
    },
    computed: {
      ...mapGetters({
        stepper: 'answers/stepper',
      })
    },
    methods: {
      start() {
        this.isStart = true
      },
    }
  }
</script>