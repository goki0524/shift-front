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
            <v-alert v-if="postSuccess" type="success">
              メンバーを追加しました。
            </v-alert>
            <v-alert v-if="postSuccess == false" type="error">
              メンバーの追加に失敗しました。
            </v-alert>
            <v-card ref="form">
              <v-toolbar flat>
                <v-toolbar-title class="title">データを入力してメンバーを登録してください</v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <header class="input-lable">名前</header>
                <v-text-field
                  v-model="firstName"
                  :rules="[rules.required]"
                  placeholder="姓"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="lastName"
                  :rules="[rules.required]"
                  placeholder="名"
                  required
                ></v-text-field>

                <header class="input-lable">ID</header>
                <v-text-field
                  v-model="customId"
                  type="number"
                ></v-text-field>

                <header class="input-lable">メールアドレス</header>
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  placeholder="email@example.com"
                  required
                ></v-text-field>

                <header class="input-lable">性別</header>
                <v-radio-group v-model="gender" row>
                  <v-radio
                    label="男性"
                    color="primary"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="女性"
                    color="red"
                    value="2"
                  ></v-radio>
                </v-radio-group>

                <header class="input-lable">生年月日</header>
                <v-select
                  v-model="year"
                  :items="getYearItems"
                ></v-select>
                <v-select
                  v-model="month"
                  :items="getMonthItems"
                ></v-select>
                <v-select
                  v-model="date"
                  :items="getDateItems"
                ></v-select>

                <header class="input-lable">職種</header>
                {{getJobCategoryId}} | {{jobCategoryName}}
                <v-select
                  v-model="jobCategoryName"
                  :items="getJobCategoryNames"
                ></v-select>

                <header class="input-lable">役職</header>
                {{getPositionId}} | {{positionName}}
                <v-select
                  v-model="positionName"
                  :items="getPositionNames"
                ></v-select>

                <header class="input-lable">雇用区分</header>
                {{getEmploymentType}} | {{employmentTypeName}}
                <v-select
                  v-model="employmentTypeName"
                  :items="getEmploymentTypeNames"
                ></v-select>

                <header class="input-lable">新卒/中途</header>
                {{getRecruitmentType}} | {{recruitmentTypeName}}
                <v-select
                  v-model="recruitmentTypeName"
                  :items="getRecruitmentTypeNames"
                ></v-select>

                <header class="input-lable">メモ</header>
                {{memo}}
                <v-textarea
                  v-model="memo"
                  counter
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  text
                  color="#00c58e"
                  class="post-btn"
                  :loading="isLoading"
                  @click="storeMember"
                >
                  追加する
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
  // import { mapGetters } from 'vuex'
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
        drawer: false,
        isLoading: false,
        postSuccess:null,
        error: null,

        firstName: '',
        lastName: '',
        customId: null,
        email: '',
        gender: null,
        jobCategoryName: '',
        positionName: '',
        employmentTypeName: '',
        recruitmentTypeName: '',
        year: null,
        month: null,
        date: null,
        birthday: null,
        memo: '',
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
        const jobCategoryId = this.getMemberMappingData(jobCategoryJson, 'jobCategoryJson', 'name', this.jobCategoryName)
        return jobCategoryId
      },
      getPositionNames() {
        const positionNames = positionIdJson.positionId.map(i => {
          return i['name']
        })
        return positionNames
      },
      getPositionId() {
        const positionId = this.getMemberMappingData(positionIdJson, 'positionIdJson', 'name', this.positionName)
        return positionId
      },
      getEmploymentTypeNames() {
        const employmentTypeNames = employmentTypeJson.employmentType.map(i => {
          return i['name']
        })
        return employmentTypeNames
      },
      getEmploymentType() {
        const employmentType = this.getMemberMappingData(employmentTypeJson, 'employmentTypeJson', 'name', this.employmentTypeName)
        return employmentType
      },
      getRecruitmentTypeNames() {
        const recruitmentTypeNames = recruitmentTypeJson.recruitmentType.map(i => {
          return i['name']
        })
        return recruitmentTypeNames
      },
      getRecruitmentType() {
        const recruitmentType = this.getMemberMappingData(recruitmentTypeJson, 'recruitmentTypeJson', 'name', this.recruitmentTypeName)
        return recruitmentType
      },
      getBirthday() {
        const birthday = `${this.year}-${this.month}-${this.date}`
        return birthday
      }
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

      async storeMember() {

        const data = {
          customId: this.customId,
          jobCategoryId: this.getJobCategoryId,
          positionId: this.getPositionId,
          employmentType: this.getEmploymentType,
          recruitmentType: this.getRecruitmentType,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          gender: this.gender,
          birthday: this.getBirthday,
          memo: this.memo,
        }

        this.isLoading = true
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const response = await this.$axios
          .$post(API_URL, querystring.stringify({ ...data }),
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
            this.postSuccess = false
            console.log(this.error)
          }
        } else {
          this.postSuccess = true
        }
      }

    },

    // async asyncData({ $axios, query, store }) {
    //   const accessToken = store.getters['auth/accessToken']
    //   const token = accessToken.token
    //   const response = await $axios
    //   .$get(API_URL, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .catch(error => {
    //     console.log('response error: ', error)
    //     return false
    //   })
    //   console.log(response)
    //   return {
    //     company: response
    //   }
    // }
  }
</script>