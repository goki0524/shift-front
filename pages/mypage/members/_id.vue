<template>
  <v-app>
    <NavDrawer
      v-model="drawer"
    />
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-snackbar
              v-model="postSuccess"
              :timeout="timeoutPostSuccess"
              :color="postSuccessColor"
            >
              <span style="color:black;">メンバーを更新しました。</span>
              <v-btn
                text
                :color="snackbarsBtnColor"
              >
                閉じる
              </v-btn>
            </v-snackbar>
            <v-snackbar
              v-model="postFailure"
              :timeout="timeoutPostFailure"
              :color="postFailureColor"
            >
              メンバーの更新に失敗しました。 {{error}}
              <v-btn
                dark
                text
              >
                閉じる
              </v-btn>
            </v-snackbar>

            <v-card ref="form">
              <v-toolbar flat>
                <v-toolbar-title class="title">データを入力してメンバーを登録してください</v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <header class="input-lable">名前</header>
                <v-text-field
                  v-model="member.firstName"
                  :rules="[rules.required]"
                  placeholder="姓"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="member.lastName"
                  :rules="[rules.required]"
                  placeholder="名"
                  required
                ></v-text-field>

                <header class="input-lable">ID</header>
                <v-text-field
                  v-model="member.customId"
                  type="number"
                ></v-text-field>

                <header class="input-lable">メールアドレス</header>
                <v-text-field
                  v-model="member.email"
                  :rules="[rules.email]"
                  placeholder="email@example.com"
                  required
                ></v-text-field>

                <header class="input-lable">性別</header>
                {{member.gender}}
                <v-radio-group v-model="member.gender" row>
                  <v-radio
                    v-for="n in 2"
                    :key="n"
                    :value="n"
                    :label="genderText[n-1]"
                    :color="genderColor[n-1]"
                  ></v-radio>
                </v-radio-group>

                <header class="input-lable">生年月日</header>
                <v-select
                  v-model="member.birthdayObj.year"
                  :items="getYearItems"
                ></v-select>
                <v-select
                  v-model="member.birthdayObj.month"
                  :items="getMonthItems"
                ></v-select>
                <v-select
                  v-model="member.birthdayObj.date"
                  :items="getDateItems"
                ></v-select>

                <header class="input-lable">職種</header>
                {{getJobCategoryId}} | {{member.jobCategoryName}}
                <v-select
                  v-model="member.jobCategoryName"
                  :items="getJobCategoryNames"
                ></v-select>

                <header class="input-lable">役職</header>
                {{getPositionId}} | {{member.positionName}}
                <v-select
                  v-model="member.positionName"
                  :items="getPositionNames"
                ></v-select>

                <header class="input-lable">雇用区分</header>
                {{getEmploymentType}} | {{member.employmentTypeName}}
                <v-select
                  v-model="member.employmentTypeName"
                  :items="getEmploymentTypeNames"
                ></v-select>

                <header class="input-lable">新卒/中途</header>
                {{getRecruitmentType}} | {{member.recruitmentTypeName}}
                <v-select
                  v-model="member.recruitmentTypeName"
                  :items="getRecruitmentTypeNames"
                ></v-select>

                <header class="input-lable">メモ</header>
                {{member.memo}}
                <v-textarea
                  v-model="member.memo"
                  counter
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  text
                  color="#00c58e"
                  class="post-btn"
                  :loading="isLoading"
                  @click="updateMember"
                >
                  更新する
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  <Footer />
  </v-app>
</template>

<style scoped>
.title {
  color: grey;  
}
.input-lable {
  font-weight: bold;
}
.post-btn {
  display: block;
  margin: 0 0 0 auto;
}
</style>

<script>
  const API_URL = 'http://127.0.0.1:3333/api/v1/company/members'
  import querystring from 'querystring'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  import jobCategoryJson from '~/utils/member/jobCategoryId.json'
  import positionIdJson from '~/utils/member/positionId.json'
  import employmentTypeJson from '~/utils/member/employmentType.json'
  import recruitmentTypeJson from '~/utils/member/recruitmentType.json'

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: true,
        isLoading: false,
        error: null,
        postSuccess:null,
        timeoutPostSuccess: 1500,
        postSuccessColor: 'white',
        postFailure:null,
        postFailureColor: 'error',
        timeoutPostFailure: 6000,
        snackbarsBtnColor: '#00C58E',

        genderText: ['男性', '女性'],
        genderColor: ['blue', 'red'],

        rules: {
          email: v => (v || '').match(/@/) ? true : 'Emailアドレスが正しくありません',
          required: v => !!v || 'この項目は必須です',
        }
      }
    },
    computed: {
    
      getYearItems() {
        const start = 1920
        const end = 2020
        const yearItems = Array(end - start + 1).fill(null).map((_, i) => i + start)
        return yearItems
      },
      getMonthItems() {
        return [...Array(12).keys()].map(i => ++i)
      },
      getDateItems() {
        return [...Array(31).keys()].map(i => ++i)
      },
      getJobCategoryNames() {
        const jobCategoryNames = jobCategoryJson.jobCategoryId.map(i => {
          return i['name']
        })
        return jobCategoryNames
      },
      getJobCategoryId() {
        const jobCategoryId = this.getMemberMappingData(jobCategoryJson, 'jobCategoryJson', 'name', this.member.jobCategoryName)
        return jobCategoryId
      },
      getPositionNames() {
        const positionNames = positionIdJson.positionId.map(i => {
          return i['name']
        })
        return positionNames
      },
      getPositionId() {
        const positionId = this.getMemberMappingData(positionIdJson, 'positionIdJson', 'name', this.member.positionName)
        return positionId
      },
      getEmploymentTypeNames() {
        const employmentTypeNames = employmentTypeJson.employmentType.map(i => {
          return i['name']
        })
        return employmentTypeNames
      },
      getEmploymentType() {
        const employmentType = this.getMemberMappingData(employmentTypeJson, 'employmentTypeJson', 'name', this.member.employmentTypeName)
        return employmentType
      },
      getRecruitmentTypeNames() {
        const recruitmentTypeNames = recruitmentTypeJson.recruitmentType.map(i => {
          return i['name']
        })
        return recruitmentTypeNames
      },
      getRecruitmentType() {
        const recruitmentType = this.getMemberMappingData(recruitmentTypeJson, 'recruitmentTypeJson', 'name', this.member.recruitmentTypeName)
        return recruitmentType
      },
      getBirthday() {
        const birthday = `${this.member.birthdayObj.year}-${this.member.birthdayObj.month}-${this.member.birthdayObj.date}`
        return birthday
      },
    },
    methods: {
     getMemberMappingData (model, modelName, key, val) {
        if (key === 'id') {
          switch (modelName) {
            case 'jobCategoryJson':
              let targetArr1 = model.jobCategoryId.filter((obj) => {
                return obj.id === val
              })
              let targetObj1 = targetArr1.shift()
              if (typeof targetObj1 === 'object') {
                return targetObj1.hasOwnProperty('name') ? targetObj1.id : null
              }
              break
            case 'employmentTypeJson':
              let targetArr2 = model.employmentType.filter((obj) => {
                return obj.id === val
              })
              let targetObj2 = targetArr2.shift()
              if (typeof targetObj2 === 'object') {
                return targetObj2.hasOwnProperty('name') ? targetObj2.id : null
              }
              break
            case 'positionIdJson':
              let targetArr3 = model.positionId.filter((obj) => {
                return obj.id === val
              })
              let targetObj3 = targetArr3.shift()
              if (typeof targetObj3 === 'object') {
                return targetObj3.hasOwnProperty('name') ? targetObj3.id : null
              }
              break
            case 'recruitmentTypeJson':
              let targetArr4 = model.recruitmentType.filter((obj) => {
                return obj.id === val
              })
              let targetObj4 = targetArr4.shift()
              if (typeof targetObj4 === 'object') {
                return targetObj4.hasOwnProperty('name') ? targetObj4.id : null
              }
              break
            default:
              return null
          }
        } else if (key === 'name') {
          switch (modelName) {
            case 'jobCategoryJson':
              let targetArr1 = model.jobCategoryId.filter((obj) => {
                return obj.name === val
              })
              let targetObj1 = targetArr1.shift()
              if (typeof targetObj1 === 'object') {
                return targetObj1.hasOwnProperty('id') ? targetObj1.id : null
              }
              break
            case 'employmentTypeJson':
              let targetArr2 = model.employmentType.filter((obj) => {
                return obj.name === val
              })
              let targetObj2 = targetArr2.shift()
              if (typeof targetObj2 === 'object') {
                return targetObj2.hasOwnProperty('id') ? targetObj2.id : null
              }
              break
            case 'positionIdJson':
              let targetArr3 = model.positionId.filter((obj) => {
                return obj.name === val
              })
              let targetObj3 = targetArr3.shift()
              if (typeof targetObj3 === 'object') {
                return targetObj3.hasOwnProperty('id') ? targetObj3.id : null
              }
              break
            case 'recruitmentTypeJson':
              let targetArr4 = model.recruitmentType.filter((obj) => {
                return obj.name === val
              })
              let targetObj4 = targetArr4.shift()
              if (typeof targetObj4 === 'object') {
                return targetObj4.hasOwnProperty('id') ? targetObj4.id : null
              }
              break
            default:
              return null
          }
        }
      },
      async updateMember() {

        const data = {
          customId: this.member.customId,
          jobCategoryId: this.getJobCategoryId,
          positionId: this.getPositionId,
          employmentType: this.getEmploymentType,
          recruitmentType: this.getRecruitmentType,
          firstName: this.member.firstName,
          lastName: this.member.lastName,
          email: this.member.email,
          gender: this.member.gender,
          birthday: this.getBirthday,
          memo: this.member.memo,
        }

        this.isLoading = true
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const memberId = this.$route.params.id
        const response = await this.$axios
          .$put(`${API_URL}/${memberId}`, querystring.stringify({ ...data }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .catch(error => {
            console.log('response error trial', error)
          })
        this.isLoading = false
        console.log(response)

        if (response.length > 0){
          if (response[0].hasOwnProperty('message')) {
            this.error = response[0].message
            this.postFailure = true
            console.log(this.error)
          }
        } else {
          this.postSuccess = true
          this.$router.push('/mypage/members')
        }
      }

    },

    async asyncData({ $axios, query, store, params }) {
      const accessToken = store.getters['auth/accessToken']
      const token = accessToken.token
      const memberId = params.id
      
      const response = await $axios
      .$get(`${API_URL}/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      console.log(response)
      return {
        member: response[0]
      }
    }
  }
</script>