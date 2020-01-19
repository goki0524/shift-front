<template>
  <v-app>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#00c58e"
                dark
                flat
              >
                <v-toolbar-title>ログイン</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-icon>mdi-email</v-icon>
                  <v-text-field
                    label="メールアドレス"
                    name="login"
                    type="text"
                  />
                  <v-icon>mdi-lock</v-icon> 
                  <v-text-field
                    id="password"
                    label="パスワード"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#00c58e" class="white--text">ログイン</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
  }
</script>