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
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#00c58e"
                dark
                flat
              >
                <v-toolbar-title>無料で体験してみる</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-card-subtitle>
                  <h4>
                    shiftの有料機能を1ヶ月間お試しいただけます。<br/>
                    組織を強くするPDCAサイクルを体験してみませんか？
                  </h4>
                </v-card-subtitle>
                <v-form
                  v-model="form"
                >
                  <v-text-field
                    label="姓"
                    name="firstName"
                    type="text"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    label="名"
                    name="lastName"
                    type="text"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    label="会社名"
                    name="companyName"
                    type="text"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    label="法人メールアドレス"
                    name="email"
                    type="email"
                    :rules="[rules.email]"
                  />
                  <v-select
                    v-model="employeesNumberValue"
                    :items="employeesNumberItems"
                    label="導入予定人数"
                    :rules="[rules.required]"
                  ></v-select>
                  <v-select
                    v-model="requestValue"
                    :items="requestItems"
                    attach
                    chips
                    label="ご要望"
                    multiple
                    :rules="[rules.required]"
                  ></v-select>
                  <v-checkbox
                    v-model="agreement"
                    :rules="[rules.required]"
                    color="deep-purple"
                  >
                    <template v-slot:label>
                      &nbsp;
                      <a href="#" @click.stop.prevent="dialog = true">プライバシーポリシー</a>*
                      &nbsp;に同意します。
                    </template>
                  </v-checkbox>
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
                >無料で体験する
                </v-btn>
              </v-card-actions>
              <v-dialog
                v-model="dialog"
                absolute
                max-width="400"
                persistent
              >
                <v-card>
                  <v-card-title class="headline grey lighten-3">プライバシーポリシー</v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      text
                      @click="agreement = false, dialog = false"
                    >
                      同意しない
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="white--text"
                      color="deep-purple accent-4"
                      @click="agreement = true, dialog = false"
                    >
                      同意
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {

    props: {
      source: String,
    },
    data: () => ({
      employeesNumberItems: ['~9名', '10~19名', '20~99名', '100~499名', '500~999名', '1000~4999名', '5000~9999名', '10000名~'],
      employeesNumberValue: [],
      requestItems: ['組織の生産性を上げたい', '組織の状況を知りたい', '離職者を減らしたい', '他の組織改善プラットフォームとの比較', '他の企業との比較', 'その他'],
      requestValue: [],
      agreement: false,
      bio: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
      dialog: false,
      email: undefined,
      form: false,
      isLoading: false,

      rules: {
        email: v => (v || '').match(/@/) || 'Emailアドレスが正しくありません',
        required: v => !!v || 'この項目は必須です',
      },
    }),
    computed: {
      getEmployeesNumber() {
        let index = this.employeesNumberItems.indexOf(this.employeesNumberValue)
        return index
      },
      getRequest() {
        let index = this.requestValue.map(v => {
          return this.requestItems.indexOf(v)
        })
        return index
      }
    }
  }
</script>