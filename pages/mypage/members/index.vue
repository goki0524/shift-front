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
       <v-simple-table height="340px" class="company-table">
         <template v-slot:default>
           <thead>
            <tr>
               <th>氏名</th>
               <th>メールアドレス</th>
               <th>性別</th>
               <th>職種</th>
               <th>役職</th>
               <th>雇用形態</th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="(member, i) in members" :key="i.id">
              <td>{{ member.firstName }}{{ member.lastName }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.genderString }}</td>
              <td>{{ member.jobCategoryName }}</td>
              <td>{{ member.positionName }}</td>
              <td>{{ member.employmentTypeName }}</td>
            </tr>
           
           </tbody>
         </template>
       </v-simple-table>
      </v-container>
    </v-content>
  <Footer />
  </v-app>
</template>

<style scoped>

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
        drawer: false,
        members: [],
      }
    },
    // computed: {
    // },
    methods: {
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
        members: response
      }
    }
  }
</script>