<template>
  <div>
    <div v-if="stepper !== 1">
      <v-row justify="center">
        <v-icon>mdi-chevron-up</v-icon>
      </v-row>
      <v-row justify="center">
        <v-btn color="teal" text small @click="back()">もどる</v-btn>
      </v-row>
    </div>
    <v-row justify="center" class="mt-5">
      <h2>{{stepper}}/{{getQuestionCount}}</h2>
    </v-row>
    <v-card-title>
      <v-row justify="center">
        <div class="question-title">
          {{getDefaultQuestions(stepper-1)}}
        </div>
      </v-row>
    </v-card-title>
      
    <div class="word-row">
      <v-row justify="center">
        <v-col cols="6" class="word">
          <v-icon>mdi-chevron-double-left</v-icon>{{getAnswerLowestWord(stepper-1)}}
        </v-col>
        <v-col cols="6" class="word">
          {{getAnswerBestWord(stepper-1)}} <v-icon>mdi-chevron-double-right</v-icon>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center">
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(2)">
        <v-icon>mdi-source-commit-start-next-local</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(3)">
        <v-icon>mdi-source-commit-start-next-local</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(4)">
        <v-icon>mdi-source-commit-start-next-local</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(5)">
        <v-icon>mdi-source-commit-start-next-local</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(6)">
        <v-icon>mdi-source-commit-start-next-local</v-icon>
      </v-btn>
      <v-btn class="ma-1" outlined small fab color="teal" @click="next(7)">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>

  </div>
</template>

<style scoped>
.question-title {
  margin-top: 10px; 
  font-size: 20px;
}
.word-row {
  margin-top: 10px;
}
.word {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      getQuestionCount() {
        if (this.questions && this.questions.length > 0) {
          return this.questions.length
        }
      },
      ...mapGetters({
        stepper: 'answers/stepper',
        questions: 'answers/questions',
      })
    },
    methods: {
      next(num) {
        this.$store.commit('answers/addAnswersArr', num)
        this.$store.commit('answers/setStepper', this.stepper+1)
      },
      back() {
        this.$store.commit('answers/deleteAnswersArr')
        this.$store.commit('answers/setStepper', this.stepper-1)
      },
      getDefaultQuestions(index) {
        if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
          if (this.questions[index].hasOwnProperty('content')) {
            return this.questions[index].content
          }
        }
      },
      getAnswerBestWord(index) {
        if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
          if (this.questions[index].hasOwnProperty('answerBestWord')) {
            return this.questions[index].answerBestWord
          }
        }
      },
      getAnswerLowestWord(index) {
         if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
           if (this.questions[index].hasOwnProperty('answerLowestWord')) {
             return this.questions[index].answerLowestWord
           }
         }
      }
    }
  }
</script>