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
  import QuestionItems from '~/components/answers/QuestionItems.vue'
  const API_URL = 'http://127.0.0.1:3333/api/v1/answers/engagements'

  export default {
    components: {
      QuestionItems,
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
      })
    },
    methods: {
      start() {
        this.isStart = true
      },
      async post() {
        if (!this.tag || this.answersArr.length !== this.questions.length) {
          return
        }
        const data = {
          tag: this.tag,
          a1: this.answersArr[0],
          a2: this.answersArr[1],
          a3: this.answersArr[2],
          a4: this.answersArr[3],
          a5: this.answersArr[4],
          a6: this.answersArr[5],
          a7: this.answersArr[6],
          a8: this.answersArr[7],
          a9: this.answersArr[8],
          a10: this.answersArr[9],
          a11: this.answersArr[10],
          a12: this.answersArr[11],
          a13: this.answersArr[12],
          a14: this.answersArr[13],
          a15: this.answersArr[14],
          a16: this.answersArr[15],
          a17: this.answersArr[16],
          a18: this.answersArr[17],
          a19: this.answersArr[18],
          a20: this.answersArr[19],
          a21: this.answersArr[20],
          a22: this.answersArr[21],
          a23: this.answersArr[22],
          a24: this.answersArr[23],
          a25: this.answersArr[24],
          a26: this.answersArr[25],
          a27: this.answersArr[26],
          a28: this.answersArr[27],
          a29: this.answersArr[28],
          a30: this.answersArr[29],
          a31: this.answersArr[30],
          a32: this.answersArr[31]
        }
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