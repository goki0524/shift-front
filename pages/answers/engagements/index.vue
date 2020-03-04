<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-stepper v-model="stepper">
            <v-stepper-content step="1" class="mb-10 stepper">

              <v-row justify="center">
                <v-icon>mdi-chevron-up</v-icon>
              </v-row>
              <v-row justify="center">
                <v-btn color="teal" text small @click="stepper = stepper-1">もどる</v-btn>
              </v-row>
              <v-row justify="center" class="mt-5">
                <h2>{{stepper}}/{{response.length}}</h2>
              </v-row>

              <v-card-title>
                <v-row justify="center">
                  <div class="question-title">
                    {{response[0].content}}
                  </div>
                </v-row>
              </v-card-title>
                
              <div class="word-row">
                <v-row justify="center">
                  <v-col cols="6" class="word">
                    <v-icon>mdi-chevron-double-left</v-icon>{{response[0].answerLowestWord}}
                  </v-col>
                  <v-col cols="6" class="word">
                    {{response[0].answerBestWord}} <v-icon>mdi-chevron-double-right</v-icon>
                  </v-col>
                </v-row>
              </div>

              <v-row justify="center">
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = stepper+1">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>

            </v-stepper-content>
        
            
            <v-stepper-content step="2" class="mb-10 stepper">
              <v-row justify="center">
                <v-icon>mdi-chevron-up</v-icon>
              </v-row>
              <v-row justify="center">
                <v-btn color="teal" text small @click="stepper = stepper-1">もどる</v-btn>
              </v-row>
              <v-row justify="center" class="mt-5">
                <h2>{{stepper}}/32</h2>
              </v-row>

              <v-card-title>
                <v-row justify="center">
                  <div class="question-title">
                    {{response[1].content}}
                  </div>
                </v-row>
              </v-card-title>

              <div class="word-row">
                <v-row justify="center">
                  <v-col cols="6" class="word">
                    <v-icon>mdi-chevron-double-left</v-icon>{{response[1].answerLowestWord}}
                  </v-col>
                  <v-col cols="6" class="word">
                    {{response[1].answerBestWord}} <v-icon>mdi-chevron-double-right</v-icon>
                  </v-col>
                </v-row>
              </div>

              <v-row justify="center">
                <v-btn class="ma-1" outlined small fab color="teal" @click="stepper = 2">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-source-commit-start-next-local</v-icon>
                </v-btn>
                <v-btn class="ma-1" outlined small fab color="teal">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </v-stepper-content>

          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<style scoped>
.stepper {
  padding: 0px;
}
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
  const API_URL = 'http://127.0.0.1:3333/api/v1/answers/engagements'

  export default {
    data() {
      return {
        stepper: 1,
        response: null,
      }
    },
    computed: {
    },
    methods: {
    },
    async asyncData({ $axios, route }) {
      const tag = route.query.tag
      console.log(tag)
      const response = await $axios
      .$get(`${API_URL}?tag=${tag}`)
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      return {
        response: response
      }
    },
  }

</script>