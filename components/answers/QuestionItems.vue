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
      <h2>{{ stepper }}/{{ questionCount }}</h2>
    </v-row>
    <v-card-title>
      <v-row justify="center">
        <div class="question-title">
          {{ defaultQuestionContent(questionNumber) }}
        </div>
      </v-row>
    </v-card-title>

    <div v-if="answerWordCount(questionNumber) == 6" class="answer-btn-group">
      <v-row justify="center">
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(1)">
          {{ answerWord(questionNumber, 1) }}
        </v-btn>
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(2)">
          {{ answerWord(questionNumber, 2) }}
        </v-btn>
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(3)">
          {{ answerWord(questionNumber, 3) }}
        </v-btn>
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(4)">
          {{ answerWord(questionNumber, 4) }}
        </v-btn>
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(5)">
          {{ answerWord(questionNumber, 5) }}
        </v-btn>
        <v-btn class="ma-2 answer-btn" outlined color="teal" @click="next(6)">
          {{ answerWord(questionNumber, 6) }}
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.question-title {
  margin-top: 10px;
  padding: 0 10px 0 10px;
  font-size: 18px;
}
.word-row {
  margin-top: 10px;
}
.word {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}
.answer-btn-group {
  margin-top: 20px;
}
.answer-btn {
  width: 200px;
  height: 50px;
}
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        value: 0,
      }
    },
    computed: {
      ...mapGetters({
        stepper: 'answers/stepper',
        questions: 'answers/questions',
      }),
      questionCount() {
        if (this.questions && this.questions.length > 0) {
          return this.questions.length
        }
      },
      questionNumber() {
        return this.stepper-1
      }
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
      defaultQuestionContent(index) {
        if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
          if (this.questions[index].hasOwnProperty('content')) {
            return this.questions[index].content
          }
        }
      },
      answerWord(questionIndex, answerWordIndex) {
        if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
          if (this.questions[questionIndex].hasOwnProperty('answerWordCount')) {
            const answerWords = this.questions[questionIndex].answerWords.split('|')
            return answerWords[answerWordIndex-1]
          }
        }
      },
      answerWordCount(index) {
        if (this.questions && this.questions.length > 0 && this.stepper <= this.questions.length) {
          if (this.questions[index].hasOwnProperty('answerWordCount')) {
            return this.questions[index].answerWordCount
          }
        }
      }
    }
  }
</script>