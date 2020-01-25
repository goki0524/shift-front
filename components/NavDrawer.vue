<template>
  <div>
    <v-navigation-drawer
      :value="value"
      @input="$emit('input', $event)"
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
      <nuxt-link to="/mypage/company" class="left-nav-a">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-city</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="left-nav-a-text">会社情報</v-list-item-title>
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
      <v-app-bar-nav-icon @click.stop="click" />
      <v-toolbar-title>SHIFT</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        ログアウト
      </v-btn>
    </v-app-bar>
  </div>
  
</template>

<style scoped>
.left-nav-a {
  color : inherit;
  text-decoration : none;
}
</style>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click () {        
        let drawer = this.$parent.$parent.drawer
        this.$parent.$parent.drawer = !drawer
      },
      logout () {
        Cookie.remove('auth')
        this.$store.commit('auth/setAccessToken', null)
        this.$router.push('/')
      }
    }
  }
</script>