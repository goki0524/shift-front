<template>
  <v-app>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
  <v-list dense>
    <v-list-item link>
      <v-list-item-action>
        <v-icon>mdi-home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>ホーム</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link>
      <v-list-item-action>
        <v-icon>mdi-contact-mail</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>お問い合わせ</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  </v-navigation-drawer>
    <v-app-bar
      app
      color="#00c58e"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SHIFT</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
       <p>mypage</p>
      </v-container>
    </v-content>
  <Footer />
  </v-app>
</template>

<script>
  import Footer from '~/components/Footer.vue'
  export default {
    components: {
      Footer,
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>