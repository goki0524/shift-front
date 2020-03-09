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
              配信予約を設定しました。
            </v-alert>
            <v-alert v-if="postSuccess == false" type="error">
              配信予約に失敗しました。{{error}}
            </v-alert>
            <v-card ref="form">
              <v-toolbar flat>
                <v-toolbar-title class="title">配信予約</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <header class="input-lable">配信日</header>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-dialog
                        ref="deliveryDialog"
                        v-model="deliveryModal"
                        :return-value.sync="deliveryDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="deliveryDate"
                            label="配信日を選択してください"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="deliveryDate" scrollable color="#00c58e">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="deliveryModal = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.deliveryDialog.save(deliveryDate)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
              </v-card-text>
              <v-card-text>
                <header class="input-lable">配信時間</header>
                  <v-row>
                    <v-col cols="4" sm="4" md="2">
                      <v-select v-model="deliveryHour" :items="deliveryHourItems"></v-select>
                    </v-col>
                    <v-col cols="1" class="time-text">
                      時
                    </v-col>
                    <v-col cols="4" sm="4" md="2">
                      <v-select v-model="deliveryMinute" :items="deliveryMinuteItems"></v-select>
                    </v-col>
                    <v-col cols="1" class="time-text">
                      分
                    </v-col>
                  </v-row>
              </v-card-text>
              <v-card-text>
                <header class="input-lable">回答期日</header>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-dialog
                        ref="deadlineDialog"
                        v-model="deadlineModal"
                        :return-value.sync="deadlineDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="deadlineDate"
                            label="回答期日を選択してください"
                            prepend-icon="mdi-update"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="deadlineDate" scrollable color="#00c58e">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="deadlineModal = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.deadlineDialog.save(deadlineDate)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  text
                  color="#00c58e"
                  class="post-btn"
                  :loading="isLoading"
                  @click="postDelivery"
                >
                  設定する
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
.left-nav-a {
  color : inherit;
  text-decoration : none;
}
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
.time-text {
  margin-top: 25px;
}
</style>


<script>
  import querystring from 'querystring'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  const API_URL = 'http://127.0.0.1:3333/api/v1/delivery'
  
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
        postSuccess: null,
        error: null,
        deliveryDate: new Date().toISOString().substr(0, 10),
        deliveryModal: false,
        deadlineDate: new Date().toISOString().substr(0, 10),
        deadlineModal: false,
        deliveryHourItems: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        deliveryMinuteItems: ['00', '30'],
        deliveryHour: null,
        deliveryMinute: null,
      }
    },
    methods: {
       async postDelivery() {

        const data = {
          deliveryAt: this.getDeliveryAt(),
          deadlineAt: this.getDeadlineDate()
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
            console.log('response error deliveries setting index', error)
          })
        this.isLoading = false
        
        if (response && response.length > 0){
          if (response[0].hasOwnProperty('message')) {
            this.error = response[0].message
            this.postSuccess = false
            console.log(this.error)
          }
        } else {
          this.postSuccess = true
        }
      },
      getDeliveryAt() {
        if (this.deliveryDate && this.deliveryHour && this.deliveryMinute) {
          const date = `${this.deliveryDate} ${this.deliveryHour}:${this.deliveryMinute}:00`
          return date
        }
      },
      getDeadlineDate() {
        if (this.deadlineDate) {
          const date = `${this.deadlineDate} 23:59:00`
          return date
        }
      }
    }

  }
</script>