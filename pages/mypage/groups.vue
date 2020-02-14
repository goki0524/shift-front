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
        <v-dialog v-model="groupDetailDialog" scrollable max-width="600px">
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="teal"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1">
                メンバー
                <v-icon>mdi-account-box</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                新規追加
                <v-icon>mdi-account-plus</v-icon>
              </v-tab>
              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="i in 2"
                  :key="i"
                  :value="'tab-' + i"
                >
                  <v-card flat>
                    <v-card-text>
                      <div class="group-title">{{getGroupTitle}}</div>
                      <div class="group-dialog-btn">
                        <v-btn
                          color="teal"
                          outlined
                          @click="moveGroup()"
                        >
                        グループを移動
                        </v-btn>
                        <v-btn
                          color="red"
                          outlined
                          @click="removeMember()"
                        >
                        グループから削除
                        </v-btn>
                      </div>
                    </v-card-text>
                    <div class="treeview">
                      <!-- {{selectionMembers}} -->
                      <v-treeview
                        v-model="selectionMembers"
                        :items="getMembers"
                        :selection-type="'leaf'"
                        :selected-color="'teal'"
                        selectable
                        return-object
                        open-all
                      ></v-treeview>
                    </div>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
            
            <v-divider></v-divider>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="groupAddDalog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on">新規グループを追加</v-btn>
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
              <v-btn color="teal" text @click="groupAddDalog = false">閉じる</v-btn>
              <v-btn color="teal" text @click="groupAddDalog = false; postGroupName()">作成</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card>
            <v-list two-line>
              <template v-for="(item, index) in getGroups">
                <v-subheader v-if="item.header" :key="index">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider" :key="index"></v-divider>
                <v-list-item v-else :key="index" @click="openGroupDetailDialog(item)">
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
.group-dialog-btn {
  text-align: right;
}
.group-title {
  font-size: 1.2em;
}
.treeview {
  padding-left: 10px;
}
</style>


<script>
  const API_URL_GROUPS = 'http://127.0.0.1:3333/api/v1/company/groups'
  const API_URL_MEMBERS_GROUPS = 'http://127.0.0.1:3333/api/v1/members_groups'

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
        selectedGroup: [],
        groupName: '',
        tab: null,
        selectionMembers:[],
      }
    },
    computed: {
      getGroups() {
        let groupItems = []
        this.groups.forEach((group, i) => {
          let obj = {}
          obj.id = group.id
          obj.title = group.groupName
          if (i === 0) {
            groupItems.push({ header: 'グループ' })
          }
          groupItems.push(obj)
          if (i !== this.groups.length-1) {
            groupItems.push({ divider: true })
          }
        })
        return groupItems
      },
      getGroupTitle() {
        if (this.selectedGroup.length){
          return this.selectedGroup[0].title
        }
      },
      getMembers() {
        if (this.selectedGroup.length){
          const groupId = this.selectedGroup[0].id
          if (this.groups.length){
            let memberItems = [
              {
                id: 0,
                name: 'すべてのメンバー',
                children: null,
              },
            ]
            let arr = []
            this.groups.forEach( group => {
              if (groupId == group.id) {
                arr.push(...group.members)
              }
            })
              memberItems[0].children = arr
            return memberItems
          }
        }
      },
    },
    methods: {
      openGroupDetailDialog(group) {
        this.groupDetailDialog = true
        this.selectedGroup.shift()
        this.selectedGroup.push(group)
      },
      async postGroupName() {
        const data = {
          groupName: this.groupName
        }
        
        this.isLoading = true
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const response = await this.$axios
          .$post(API_URL_GROUPS, querystring.stringify({ ...data }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .catch(error => {
            console.log('response error groups', error)
          })
        this.isLoading = false
        // console.log(response)

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
      async moveGroup() {

      },
      async removeMember() {
        if (this.selectedGroup.length) {
          const groupId = this.selectedGroup[0].id
          const memberIdsArr = this.selectionMembers.map( member => {
            return member.id
          })
          const memberIds = memberIdsArr.join(',')
          const data = {
            groupId: groupId,
            memberIds: memberIds
          }
          
          this.isLoading = true
          const accessToken = this.$store.getters['auth/accessToken']
          const token = accessToken.token
          const headers = {Authorization: `Bearer ${token}`}
          const response = await this.$axios
            .$delete(API_URL_MEMBERS_GROUPS, {
              headers: headers,
              data: data
            })
            .catch(error => {
              console.log('response error groups', error)
            })
          this.isLoading = false
          console.log(response)
        }
      },
    },
    async asyncData({ $axios, query, store }) {
      const accessToken = store.getters['auth/accessToken']
      const token = accessToken.token
      const response = await $axios
      .$get(API_URL_GROUPS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      return {
        groups: response
      }
    }
  }
</script>