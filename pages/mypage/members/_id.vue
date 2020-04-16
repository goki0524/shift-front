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
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="member.lastName"
                      :rules="[rules.required]"
                      placeholder="姓"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="member.firstName"
                      :rules="[rules.required]"
                      placeholder="名"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <header class="input-lable">メールアドレス</header>
                <v-text-field
                  v-model="member.email"
                  :rules="[rules.email]"
                  placeholder="email@example.com"
                  required
                ></v-text-field>

                <v-row>
                  <v-col cols="4">
                    <header class="input-lable">ID</header>
                    <v-text-field
                      v-model="member.customId"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
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
                  </v-col>
                </v-row>

                <header class="input-lable">生年月日</header>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      v-model="member.birthdayObj.year"
                      :items="getYearItems"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="member.birthdayObj.month"
                      :items="getMonthItems"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="member.birthdayObj.date"
                      :items="getDateItems"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <header class="input-lable">職種</header>
                    {{member.jobCategoryId}}
                    <v-select
                      v-model="member.jobCategoryId"
                      :items="jobCategoryItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <header class="input-lable">役職</header>
                    {{member.positionId}}
                    <v-select
                      v-model="member.positionId"
                      :items="positionItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <header class="input-lable">雇用区分</header>
                    {{member.employmentType}}
                    <v-select
                      v-model="member.employmentType"
                      :items="employeeTypeItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <header class="input-lable">新卒/中途</header>
                    {{member.recruitmentType}}
                    <v-select
                      v-model="member.recruitmentType"
                      :items="recruitmentTypeItems"
                      item-value="id"
                      item-text="name"
                    ></v-select>
                  </v-col>
                </v-row>

                <header class="input-lable">所属グループ</header>
                {{member.groupIds}}
                <v-select
                  v-model="member.groupIds"
                  :items="groupsItems"
                  item-value="id"
                  item-text="groupName"
                  
                  chips
                  multiple
                ></v-select>

                <header class="input-lable">メモ</header>
                {{member.memo}}
                <v-textarea
                  v-model="member.memo"
                  counter
                ></v-textarea>

                <header class="input-lable">配信</header>
                {{member.isDelivery}}
                <v-radio-group v-model="member.isDelivery" row>
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
  const API_URL = `${process.env.apiUrl}/api/v1/company/members`
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
        const birthday = `${this.member.birthdayObj.year}-${this.member.birthdayObj.month}-${this.member.birthdayObj.date}`
        return birthday
      },
    },
    methods: {

      async updateMember() {
        let groupIdsStr = ''
        if (this.member.groupIds) {
          groupIdsStr = this.member.groupIds.join(',');
        }
        
        const data = {
          customId: this.member.customId,
          jobCategoryId: this.member.jobCategoryId,
          positionId: this.member.positionId,
          employmentType: this.member.employmentType,
          recruitmentType: this.member.recruitmentType,
          firstName: this.member.firstName,
          lastName: this.member.lastName,
          email: this.member.email,
          gender: this.member.gender,
          groupIds: groupIdsStr,
          birthday: this.getBirthday,
          memo: this.member.memo,
          isDelivery: this.member.isDelivery
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
      
      const memberData = await $axios
      .$get(`${API_URL}/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      console.log(memberData)

      const formData = await $axios
      .$get(`${API_URL}/new`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      console.log(formData)

      return {
        member: memberData,
        groupsItems: formData.groups,
        employeeTypeItems: formData.employeeType,
        jobCategoryItems: formData.jobCategory,
        positionItems: formData.position,
        recruitmentTypeItems: formData.recruitmentType
      }
    }
  }
</script>