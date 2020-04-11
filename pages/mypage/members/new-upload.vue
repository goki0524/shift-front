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
          <v-alert v-if="uploadSuccess" type="success">
            メンバーの一括登録が完了しました
          </v-alert>
          <v-alert v-if="uploadSuccess == false" type="error">
            メンバーの一括登録に失敗しました
          </v-alert>
        </v-row>
        <v-row justify="center">
          <v-btn 
            class="white--text"
            color="#00c58e"
            depressed
            href="https://shift-s3-public.s3-ap-northeast-1.amazonaws.com/template/template-members-create.xlsx"
          >テンプレートをダウンロード
          </v-btn>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="8">
            <template>
               <v-file-input
                v-model="file"
                color="deep-purple accent-4"
                counter
                label="File input"
                multiple
                placeholder="Excelファイルを選択してください"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
                >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ file.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </template>
            <v-btn 
              :disabled="!file"
              :loading="isLoading"
              class="white--text"
              color="#00c58e"
              depressed
              @click="upload"
            >アップロード
            <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
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
  const API_URL = 'http://127.0.0.1:3333/api/v1/company/members/xlsx-upload'
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
        uploadSuccess: null,
        error: null,
        file: null,
      }
    },
    methods: {
      async upload () {
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const params = new FormData()
        params.append('files', this.file[0])

        this.isLoading = true
        const response = await this.$axios
          .$post(API_URL, params, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data;'
            }
          })
          .catch(error => {
            console.log('response error login', error)
          })
        this.isLoading = false
        console.log(response)
        if (response[0] && response[0].hasOwnProperty('message')) {
          const message = response[0].message
          if (message === 'success') {
            this.uploadSuccess = true
          }
        }
      }
    }
  }
</script>