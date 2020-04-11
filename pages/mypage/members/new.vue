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
          <v-col cols="12" sm="10" md="8" lg="8">
            <v-alert v-if="postSuccess" type="success">
              メンバーを追加しました。
            </v-alert>
            <v-alert v-if="postSuccess == false" type="error">
              メンバーの追加に失敗しました。{{error}}
            </v-alert>
            <v-card ref="form">
              <v-toolbar flat>
                <v-toolbar-title class="title">データを入力してメンバーを登録してください</v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <header class="input-lable">名前</header>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="lastName"
                      :rules="[rules.required]"
                      placeholder="姓"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="firstName"
                      :rules="[rules.required]"
                      placeholder="名"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <header class="input-lable">メールアドレス</header>
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  placeholder="email@example.com"
                  required
                ></v-text-field>

                <v-row>
                  <v-col cols="4">
                    <header class="input-lable">ID</header>
                    <v-text-field
                      v-model="customId"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <header class="input-lable">性別</header>
                    <v-radio-group v-model="gender" row>
                      <v-radio
                        v-for="n in 2"
                        :key="n"
                        :value="n"
                        :label="genderText[n-1]"
                        :color="genderColor[n-1]"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <header class="input-lable">生年月日</header>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      v-model="year"
                      :items="getYearItems"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="month"
                      :items="getMonthItems"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="date"
                      :items="getDateItems"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <header class="input-lable">職種</header>
                    {{jobCategoryId}}
                    <v-select
                      v-model="jobCategoryId"
                      :items="jobCategoryItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <header class="input-lable">役職</header>
                    {{positionId}}
                    <v-select
                      v-model="positionId"
                      :items="positionItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="6">
                    <header class="input-lable">雇用区分</header>
                    {{employmentType}}
                    <v-select
                      v-model="employmentType"
                      :items="employeeTypeItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>

                  <v-col cols="6">
                    <header class="input-lable">新卒/中途</header>
                    {{recruitmentType}}
                    <v-select
                      v-model="recruitmentType"
                      :items="recruitmentTypeItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                </v-row>

                <header class="input-lable">所属グループ</header>
                {{groupIds}}
                <v-select
                  v-model="groupIds"
                  :items="groupsItems"
                  item-value="id"
                  item-text="groupName"
                  attach
                  chips
                  multiple
                ></v-select>

                <header class="input-lable">メモ</header>
                {{memo}}
                <v-textarea
                  v-model="memo"
                  counter
                ></v-textarea>

                <header class="input-lable">配信</header>
                {{isDelivery}}
                <v-radio-group v-model="isDelivery" row>
                  <v-radio
                    v-for="n in 2"
                    :key="n"
                    :value="n-1"
                    :label="deliveryText[n-1]"
                    :color="deliveryColor[n-1]"
                  ></v-radio>
                </v-radio-group>
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
  const API_URL = 'http://127.0.0.1:3333/api/v1/company/members/new'
  import querystring from 'querystring'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'

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
        postSuccess:null,
        error: null,
        // user input data
        firstName: '',
        lastName: '',
        customId: null,
        email: '',
        gender: null,
        groupIds: [],
        employmentType: null,
        jobCategoryId: null,
        positionId: null,
        recruitmentType: null,
        year: null,
        month: null,
        date: null,
        birthday: null,
        memo: '',
        isDelivery: null,
        genderText: ['男性', '女性'],
        genderColor: ['blue', 'red'],
        deliveryText:['配信しない', '配信する'],
        deliveryColor: ['red', 'blue'],
        rules: {
          email: v => (v || '').match(/@/) ? true : 'Emailアドレスが正しくありません',
          required: v => !!v || 'この項目は必須です',
        }
      }
    },
    computed: {
      getYearItems() {
        const nowYear = new Date().getFullYear()
        const start = nowYear - 100
        const end = nowYear
        const yearItems = Array(end - start + 1).fill(null).map((_, i) => i + start)
        return yearItems
      },
      getMonthItems() {
        return [...Array(12).keys()].map(i => ++i)
      },
      getDateItems() {
        return [...Array(31).keys()].map(i => ++i)
      },
      getBirthday() {
        const birthday = `${this.year}-${this.month}-${this.date}`
        return birthday
      }
    },
    methods: {
    
    async storeMember() {
      let groupIdsStr = ''
      if (this.groupIds) {
        groupIdsStr = this.groupIds.join(',');
      }

      const data = {
        customId: this.customId,
        jobCategoryId: this.jobCategoryId,
        positionId: this.positionId,
        employmentType: this.employmentType,
        recruitmentType: this.recruitmentType,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        gender: this.gender,
        birthday: this.getBirthday,
        groupIds: groupIdsStr,
        memo: this.memo,
        isDelivery: this.isDelivery
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
          console.log('response error member new', error)
        })
      this.isLoading = false
      console.log(response)

      if (response && response.length > 0){
        if (response[0].hasOwnProperty('message')) {
          this.error = response[0].message
          this.postSuccess = false
          console.log(this.error)
        }
      } else {
        this.postSuccess = true
        this.$router.push('/mypage/members')
      }
    }

  },

    async asyncData({ $axios, query, store }) {
      const accessToken = store.getters['auth/accessToken']
      const token = accessToken.token
      const response = await $axios
      .$get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      console.log(response.groups)
      return {
        groupsItems: response.groups,
        employeeTypeItems: response.employeeType,
        jobCategoryItems: response.jobCategory,
        positionItems: response.position,
        recruitmentTypeItems: response.recruitmentType
      }
    }
  }
</script>