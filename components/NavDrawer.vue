<template>
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