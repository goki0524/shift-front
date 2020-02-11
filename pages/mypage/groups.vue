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
      <v-row justify="center">
        <v-dialog v-model="groupDetailDialog" scrollable max-width="300px">
          <v-card>
            <v-card-title>{{groupDetailDialogItems}}</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="dialogm1" column>
                <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                <v-radio label="Bahrain" value="bahrain"></v-radio>
                <v-radio label="Bangladesh" value="bangladesh"></v-radio>
                <v-radio label="Barbados" value="barbados"></v-radio>
                <v-radio label="Belarus" value="belarus"></v-radio>
                <v-radio label="Belgium" value="belgium"></v-radio>
                <v-radio label="Belize" value="belize"></v-radio>
                <v-radio label="Benin" value="benin"></v-radio>
                <v-radio label="Bhutan" value="bhutan"></v-radio>
                <v-radio label="Bolivia" value="bolivia"></v-radio>
                <v-radio label="Bosnia and Herzegovina" value="bosnia"></v-radio>
                <v-radio label="Botswana" value="botswana"></v-radio>
                <v-radio label="Brazil" value="brazil"></v-radio>
                <v-radio label="Brunei" value="brunei"></v-radio>
                <v-radio label="Bulgaria" value="bulgaria"></v-radio>
                <v-radio label="Burkina Faso" value="burkina"></v-radio>
                <v-radio label="Burma" value="burma"></v-radio>
                <v-radio label="Burundi" value="burundi"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="groupDetailDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="groupDetailDialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="groupAddDalog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">新規グループを追加</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">グループを作成</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    {{groupName}}
                    <v-text-field
                      label="グループ名*"
                      v-model="groupName"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*必須項目</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="groupAddDalog = false">閉じる</v-btn>
              <v-btn color="blue darken-1" text @click="groupAddDalog = false; postGroupName()">作成</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
        <v-card>
          <v-list two-line>

            <template v-for="(item, index) in getGroups">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <v-list-item v-else :key="item.title" @click="openGroupDetailDialog(item)">

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
                  
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
       </v-row>
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
  // import { mapGetters } from 'vuex'
  const API_URL = 'http://127.0.0.1:3333/api/v1/company/groups'
  import querystring from 'querystring'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: true,
        groups: [],
        groupAddDalog: false,
        groupDetailDialog: false,
        groupDetailDialogItems: [],
        groupName: '',
        dialogm1: '',
       
        // items: [
        //   { header: 'グループ' },
        //   { title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        //   { divider: true },
        //   { title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        //   { divider: true },
        //   { title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
        // ],
      }
    },
    computed: {
      getGroups() {
        let groupItems = []
        this.groups.forEach((group, i) => {
          let obj = {}
          obj.title = group.groupName
          if (i === 0) {
            groupItems.push({ header: 'グループ' })
          }
          groupItems.push(obj)
          if (i !== this.groups.length-1) {
            groupItems.push({ divider: true })
          }
        })
        console.log(groupItems)
        return groupItems
      }
    },
    methods: {
      openGroupDetailDialog(group) {
        this.groupDetailDialog = true
        this.groupDetailDialogItems.shift()
        this.groupDetailDialogItems.push(group)
      },
      async postGroupName() {
        const data = {
          groupName: this.groupName
        }
        
        this.isLoading = true
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const response = await this.$axios
          .$post(API_URL, querystring.stringify({ ...data }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .catch(error => {
            console.log('response error groups', error)
          })
        this.isLoading = false
        console.log(response)

        if (response && response.length > 0){
          if (response[0].hasOwnProperty('message')) {
            this.error = response[0].message
            this.postSuccess = false
            console.log(this.error)
          }
        } else {
          this.postSuccess = true
          this.groups.push(response)
          this.groupName = ''
        }
      },
  
    },
    async asyncData({ $axios, query, store }) {
      const accessToken = store.getters['auth/accessToken']
      const token = accessToken.token
      const response = await $axios
      .$get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      console.log(response)
      return {
        groups: response
      }
    }
  }
</script>