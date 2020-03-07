<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <Questions/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
</style>

<script>
  import Questions from '~/components/answers/Questions.vue'

  const API_URL = 'http://127.0.0.1:3333/api/v1/answers/engagements'

  export default {
    components: {
      Questions,
    },
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {
    },
    async asyncData({ $axios, route, redirect, store }) {
      const tag = route.query.tag
      let error = null
      console.log(tag)
      if (!tag) {
        redirect('/')
      }
      const response = await $axios
      .$get(`${API_URL}?tag=${tag}`)
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      if (response.statusCode !== 200) {
        if (response.error.hasOwnProperty('message')) {
          error = response.error.message
          console.log(error)
        }
      }
      store.commit('answers/setQuestions', response.data)
      return {
        error: error
      }
    },
  }

</script>