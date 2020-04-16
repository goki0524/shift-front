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
          <v-col cols="12">
            <v-card>
              <v-simple-table fixed-header height="550px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>配信日</th>
                      <th>回答締め切り日</th>
                      <th>対象者</th>
                      <th>未回答者</th>
                      <th>回答率</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-for="delivery in deliveries" :key="delivery.id">
                    <tr>
                      <td>{{ delivery.deliveryDate }}</td>
                      <td>{{ delivery.deadlineDate }}</td>
                      <td>{{ delivery.deliveryCount }}名</td>
                      <td>{{ delivery.answerCount }}名</td>
                      <td>{{ delivery.answerRate }}%</td>
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
</style>


<script>
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  const API_URL = `${process.env.apiUrl}/api/v1/deliveries`

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
        console.log('response error deliveries index: ', error)
        return false
      })
      console.log(response)
      return {
        deliveries: response
      }
    }
  }
</script>