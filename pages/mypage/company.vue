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
          <v-col cols="8">
            <v-card>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td><span class="label">ID:</span>{{ company.id }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">会社名:</span>{{ company.companyName }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">メールアドレス:</span>{{ company.email }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">電話番号:</span>{{ company.phoneNumber }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">URL:</span>{{ company.url }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">郵便番号:</span>{{ company.zip }}</td>
                    </tr>
                    <tr>
                      <td><span class="label">所在地:</span>{{ company.fullAddress }}</td>
                    </tr>             
                  </tbody>
                </template>
              </v-simple-table>
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
.label {
  color: grey;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 20px; 
}
</style>


<script>
  import { mapGetters } from 'vuex'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  const API_URL = `${process.env.apiUrl}/api/v1/company`

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: true,
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
      console.log(response)
      return {
        company: response
      }
    }
  }
</script>