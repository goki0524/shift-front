<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div v-if="error">
            <v-row justify="center">
              {{error}}
            </v-row>
          </div>
          <div v-else>
            <Questions/>
          </div>
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
      } else {
        store.commit('answers/setQuestions', response.data)
        store.commit('answers/setTag', tag)
      }
      return {
        error: error
      }
    },
  }

</script>