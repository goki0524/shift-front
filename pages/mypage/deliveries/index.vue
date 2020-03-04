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
        
      <h1>delivery page</h1>

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
  
  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    props: {
      source: String,
    },
    data() {
      return {
        drawer: true,

      }
    },
  }
</script>