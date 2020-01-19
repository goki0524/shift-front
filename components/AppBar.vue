<template>
  <v-app-bar
      app
      color="#00c58e"
      dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>SHIFT</v-toolbar-title>
  </v-app-bar>
</template>

<script>
  export default {
    props: {
      drawer: Boolean,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>