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
            <v-card ref="form">
              <v-toolbar flat>
                <v-toolbar-title class="title">データを入力してメンバーを登録してください</v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <header class="input-lable">名前</header>
                <v-text-field
                  ref="firstName"
                  v-model="firstName"
                  :rules="[rules.required]"
                  placeholder="姓"
                  required
                ></v-text-field>

                <v-text-field
                  ref="lastName"
                  v-model="lastName"
                  :rules="[rules.required]"
                  placeholder="名"
                  required
                ></v-text-field>

                <header class="input-lable">メールアドレス</header>
                <v-text-field
                  ref="email"
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
                
              </v-card-text>
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
</style>

<script>
  // import { mapGetters } from 'vuex'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  // const API_URL = 'http://127.0.0.1:3333/api/v1/company'
  import jobCategoryJson from '~/utils/member/jobCategoryId.json'
  import positionIdJson from '~/utils/member/positionId.json'
  import employmentTypeJson from '~/utils/member/employmentType.json'

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
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
      }
    },
    data() {
      return {
        drawer: false,
        firstName: '',
        lastName: '',
        customId: null,
        email: '',
        gender: null,
        jobCategoryName: '',
        positionName: '',
        employmentTypeName: '',
        recruitmentType: null,
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
            default:
              return null
          }
        }
      }
    }
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