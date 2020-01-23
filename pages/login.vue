<template>
  <v-app>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-alert v-if="loginSuccess == false" type="error">
              ログインに失敗しました。<br/>
              {{this.error}}
            </v-alert>
            <v-card>
              <v-toolbar
                color="#00c58e"
                dark
                flat
              >
                <v-toolbar-title>ログイン</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="form"
                >
                  <v-icon>mdi-email</v-icon>
                  <v-text-field
                    v-model="email"
                    label="メールアドレス"
                    name="email"
                    type="text"
                    :rules="[rules.email]"
                  />
                  <v-icon>mdi-lock</v-icon> 
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="パスワード"
                    name="password"
                    type="password"
                    :rules="[rules.required]"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                  :disabled="!form"
                  :loading="isLoading"
                  class="white--text"
                  color="#00c58e"
                  depressed
                  @click="login"
                >ログイン
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import querystring from 'querystring'
  const Cookie = process.client ? require('js-cookie') : undefined
  const API_URL = 'http://127.0.0.1:3333/api/v1/auth/login'

  export default {
    middleware: 'notAuthenticated',
    props: {
      source: String,
    },
    data() {
      return {
        error: null,
        loginSuccess: null,
        form: false,
        isLoading: false,
        email: '',
        password: '',

        rules: {
          email: v => (v || '').match(/@/) ? true : 'Emailアドレスが正しくありません',
          required: v => !!v || 'この項目は必須です',
        }
      }
    },
    methods: {
      async login () {

        const data = {
          email: this.email,
          password: this.password
        }
        this.isLoading = true
        const response = await this.$axios
          .$post(API_URL, querystring.stringify({ ...data }))
          .catch(error => {
            console.log('response error login', error)
          })
        this.isLoading = false
        console.log(response)
        if (response[0] && response[0].hasOwnProperty('message')){
          // if (response[0].hasOwnProperty('message')) {
            this.error = response[0].message
            this.loginSuccess = false
            console.log(this.error)
          // }
        } else if (response) {
          // login success
          this.loginSuccess = true
          this.$store.commit('setAccessToken', response.accessToken)
          Cookie.set('auth', response.accessToken)
          // redirect('/mypage')
          console.log('login success')
          console.log(this.$store.state.accessToken.token)
          this.$router.push('/mypage')
        }
      }
    }
  }
</script>