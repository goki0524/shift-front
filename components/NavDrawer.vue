<template>
  <div>
    <v-navigation-drawer
      :value="value"
      @input="$emit('input', $event)"
      app
    >
      <v-list>
        <nuxt-link to="/mypage" class="left-nav-a">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>ホーム</v-list-item-title>
        </v-list-item>
        </nuxt-link>


        <v-list-group
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>メンバー</v-list-item-title>
          </template>
  
          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>メンバー管理</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
        <nuxt-link to="/mypage/members/new" class="left-nav-a">
          <v-list-item link>
            <v-list-item-icon />
            <v-list-item-title>メンバー登録</v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-action>
          </v-list-item>
        </nuxt-link>
            
          
        </v-list-group>

        <v-list-group
          prepend-icon="mdi-account-multiple"
        >
          <template v-slot:activator>
            <v-list-item-title>グループ</v-list-item-title>
          </template>
  
          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>グループ管理</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>グループ登録</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(crud, i) in cruds"
              :key="i"
              link
            >
              <v-list-item-title v-text="crud[0]"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>


        <v-list-group
          prepend-icon="mdi-telegram"
        >
          <template v-slot:activator>
            <v-list-item-title>配信</v-list-item-title>
          </template>
  
          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>配信状況</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>配信予約</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(crud, i) in cruds"
              :key="i"
              link
            >
              <v-list-item-title v-text="crud[0]"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>

        <nuxt-link to="/mypage/company" class="left-nav-a">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-city</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="left-nav-a-text">会社情報</v-list-item-title>
          </v-list-item>
        </nuxt-link>

        <nuxt-link to="/mypage/contact" class="left-nav-a">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>お問い合わせ</v-list-item-title>
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
    data: () => ({
      admins: [
        ['Management', 'mdi-people-outline'],
        ['Settings', 'mdi-settings'],
      ],
      cruds: [
        ['Create', 'mdi-add'],
        ['Read', 'mdi-insert-drive-file'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      memberAdd: [
        ['入力フォームでの登録', 'mdi-add'],
        ['ファイルアップロードで一括登録', 'mdi-insert-drive-file'],
      ],
    }),
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