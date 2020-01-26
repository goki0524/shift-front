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
      
      <p>members index page</p>
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
  // const API_URL = 'http://127.0.0.1:3333/api/v1/company'

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: false,
      }
    },
    // async asyncData({ $axios, query, store }) {
    //   const accessToken = store.getters['auth/accessToken']
    //   const token = accessToken.token
    //   const response = await $axios
    //   .$get(API_URL, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .catch(error => {
    //     console.log('response error: ', error)
    //     return false
    //   })
    //   console.log(response)
    //   return {
    //     company: response
    //   }
    // }
  }
</script>