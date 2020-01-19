<template>
  <v-app>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
  <v-list dense>
    <nuxt-link to="/mypage" class="left-nav-a">
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>ホーム</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </nuxt-link>
    <nuxt-link to="/mypage/contact" class="left-nav-a">
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="left-nav-a-text">お問い合わせ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </nuxt-link>
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
       <p>contact</p>
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