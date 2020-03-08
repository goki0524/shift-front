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
              <v-card-text>
                <v-simple-table fixed-header height="550px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>氏名</th>
                        <th>メールアドレス</th>
                        <th>性別</th>
                        <th>職種</th>
                        <th>役職</th>
                        <th>雇用形態</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody v-for="member in members" :key="member.id">
                      <tr>
                        <td>{{ member.firstName }}{{ member.lastName }}</td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.genderString }}</td>
                        <td>{{ member.jobCategoryName }}</td>
                        <td>{{ member.positionName }}</td>
                        <td>{{ member.employmentTypeName }}</td>
                        <td>
                          <nuxt-link :to="getMemberEditURL(member.id)" class="left-nav-a">
                            <v-btn class="ma-2" tile outlined color="success">
                              <v-icon left>mdi-pencil</v-icon>編集
                            </v-btn>
                          </nuxt-link>
                        </td>
                      </tr>
                        
                    </tbody>
                  </template>
                </v-simple-table>
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
.left-nav-a {
  color : inherit;
  text-decoration : none;
}
</style>


<script>
  // import { mapGetters } from 'vuex'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  const API_URL = 'http://127.0.0.1:3333/api/v1/company/members'

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: true,
        members: [],
      }
    },
    // computed: {
    // },
    methods: {
      getMemberEditURL(id) {
        const url = `/mypage/members/${id}`
        return url
      }
    },
    async asyncData({ $axios, store }) {
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
        members: response
      }
    }
  }
</script>