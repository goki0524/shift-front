<template>
  <div>

    <v-alert v-if="postSuccess" type="success">
      ご回答ありがとうございました！
    </v-alert>
    <v-alert v-if="postSuccess == false" type="error">
      回答の送信に失敗しました。
    </v-alert>

    <div v-if="!isStart" class="start">
      <v-row justify="center">
        <h3 class="text">アンケートをはじめる</h3>
      </v-row>
       <v-row justify="center">
        <v-btn color="teal" dark class="mt-10" @click="start()">開始する</v-btn>
       </v-row>
    </div>
    <div v-else>
      <v-stepper v-model="stepper">
        <StepperContent
          v-for="n in this.questionCount"
          v-bind:key="n"
          :step="n"
        >
        </StepperContent>
        <v-stepper-content :step="this.questionCount+1" class="mb-10 stepper"> 
          <v-row justify="center">
            <h3 class="text">アンケートを送信して<br/>終了してください。</h3>
          </v-row>
          <v-row justify="center">
            <v-btn v-if="postSuccess !== true" color="teal" dark class="mt-10" :loading="isLoading" @click="post()">送信する</v-btn>
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
.text {
  margin-top: 50px;
}
</style>

<script>
  import querystring from 'querystring'
  import { mapGetters } from 'vuex'
  import StepperContent from '~/components/answers/StepperContent.vue'
  const API_URL = `${process.env.apiUrl}/api/v1/answers/engagements`

  export default {
    components: {
      StepperContent,
    },
    data() {
      return {
        isStart: false,
        isLoading: false,
        error: null,
        postSuccess: null,
      }
    },
    computed: {
      ...mapGetters({
        stepper: 'answers/stepper',
        tag: 'answers/tag',
        questions: 'answers/questions',
        answersArr: 'answers/answersArr',
        questionCount: 'answers/questionCount'
      }),
    },
    methods: {
      start() {
        this.isStart = true
      },
      getPostData() {
        let postData = {
          tag: this.tag
        }
        this.questions.map((question, index) => {
          postData[question.id] = this.answersArr[index]
        })
        return postData
      },
      async post() {
        if (!this.tag || this.answersArr.length !== this.questions.length) {
          return
        }
        const data = this.getPostData()
        this.isLoading = true
        const response = await this.$axios
          .$post(API_URL, querystring.stringify({ ...data }))
          .catch(error => {
            console.log('response error trial', error)
          })
        this.isLoading = false
        if (response && response.length > 0) {
          if (response[0].hasOwnProperty('message')) {
            this.error = response[0].message
            this.postSuccess = false
            console.log(this.error)
          }
        } else {
          this.postSuccess = true
        }
      }
    }
  }
</script>