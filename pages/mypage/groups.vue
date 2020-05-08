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
        <v-dialog v-model="groupDetailDialog" scrollable max-width="650px">
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
                  :value="'tab-1'"
                >
                  <v-card flat>
                    <v-card-text>
                      <div class="group-title">{{getGroupTitle}}</div>
                      <div class="group-dialog-btn">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              color="teal"
                              outlined
                              :loading="isMoveGroupLoading"
                              class="group-edit-btn"
                              v-on="on"
                              :disabled="!tab1SelectionMembers.length"
                            >
                            グループを移動
                            </v-btn>
                          </template>
                            <v-list>
                              <v-list-item
                                v-for="(item, index) in getGroups"
                                :key="index"
                                @click="moveGroup(item)"
                              >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list> 
                        </v-menu>
                        <v-btn
                          color="red"
                          outlined
                          :loading="isRemoveMemberLoading"
                          :disabled="!tab1SelectionMembers.length"
                          @click="removeMember()"
                        >
                        グループから削除
                        </v-btn>
                      </div>
                    </v-card-text>
                    <v-row>
                      <v-col>
                        <div class="treeview">
                          <v-treeview
                            v-model="tab1SelectionMembers"
                            :items="memberItems"
                            :selection-type="'leaf'"
                            :selected-color="'teal'"
                            selectable
                            return-object
                            open-all
                          ></v-treeview>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>

                <v-tab-item
                  :value="'tab-2'"
                >
                  <v-card flat>
                    <v-card-text>
                      <div class="group-title">メンバー一覧</div>
                      <div class="group-dialog-btn">
                        <v-btn
                          color="teal"
                          outlined
                          :loading="isRemoveMemberLoading"
                          :disabled="!tab2SelectionMembers.length"
                          @click="addMembersToGroup()"
                        >
                        {{getGroupTitle}}グループに追加
                        </v-btn>
                      </div>
                    </v-card-text>
                    <v-row>
                      <v-col>
                        <div class="treeview">
                          <v-treeview
                            v-model="tab2SelectionMembers"
                            :items="getAllMembers"
                            :selection-type="'leaf'"
                            :selected-color="'teal'"
                            selectable
                            return-object
                            open-all
                          ></v-treeview>
                        </div>
                      </v-col>
                    </v-row>
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
              <v-btn color="teal" :loading="isPostGroupLoading" text @click="groupAddDalog = false; postGroup()">作成</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card>
            <v-list two-line>
              <template v-for="(item, index) in getGroupsCardList">
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
  margin-bottom: 20px;
}
.group-edit-btn {
  margin-right: 7px;
}
.group-title {
  font-size: 1.2em;
}
.treeview {
  padding-left: 10px;
}
</style>


<script>
  import querystring from 'querystring'
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'

  const API_URL_GROUPS = `${process.env.apiUrl}/api/v1/company/groups`
  const API_URL_MEMBERS_GROUPS = `${process.env.apiUrl}/api/v1/members_groups`
  
  // TODO: Refactoring
  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    data() {
      return {
        drawer: true,
        isPostGroupLoading: false,
        isMoveGroupLoading: false,
        isRemoveMemberLoading: false,
        isPostMemberGroupLoading: false,
        groups: [],
        groupAddDalog: false,
        groupDetailDialog: false,
        selectedGroup: [],
        groupName: '',
        tab: null,
        tab1SelectionMembers:[],
        tab2SelectionMembers:[],
        memberItems: [],
        allMemberItems: [],
      }
    },
    computed: {
      getGroupsCardList() {
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
      getGroups() {
        let groupItems = []
        if (this.selectedGroup.length) {
          const groupId = this.selectedGroup[0].id
          this.groups.forEach((group, i) => {
            let obj = {}
            if (groupId !== group.id){
              obj.id = group.id
              obj.title = group.groupName
              groupItems.push(obj)
            }
          })
          return groupItems
        }
      },
      getGroupTitle() {
        if (this.selectedGroup.length) {
          return this.selectedGroup[0].title
        }
      },
      getAllMembers() {
        this.members.forEach( member => { 
          this.allMemberItems.push(member)
        })
        let arrObj = {}
        for (let i = 0; i < this.allMemberItems.length; i++) {
          arrObj[this.allMemberItems[i]['id']] = this.allMemberItems[i]
        }
        this.allMemberItems = []
        for (let key in arrObj) {
          this.allMemberItems.push(arrObj[key])
        }
        // 現在のグループ内のメンバーは除外する
        this.memberItems.forEach(currentMember => {
          this.allMemberItems.forEach((member, index) =>{
            if (currentMember.id === member.id) {
              this.allMemberItems.splice(index, 1)
            }
          })
        })

        return this.allMemberItems
      }
    },
    methods: {
      openGroupDetailDialog(group) {
        this.groupDetailDialog = true
        this.selectedGroup.shift()
        this.selectedGroup.push(group)
        this.getMembers()
      },
      getMembers() {
        if (this.selectedGroup.length) {
          const groupId = this.selectedGroup[0].id
          if (this.groups.length){
            let arr = []
            this.groups.forEach( group => {
              if (groupId == group.id) {
                arr.push(...group.members)
              }
            })
            this.memberItems.splice(0)
            this.memberItems.push(...arr)
          }
        }
      },
      async postGroup() {
        const data = {
          groupName: this.groupName
        }
        
        this.isPostGroupLoading = true
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
            console.log('response error groups post', error)
          })
        this.isPostGroupLoading = false

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
      async addMembersToGroup() {
        if (this.selectedGroup.length) {
          const groupId = this.selectedGroup[0].id
          const memberIdsArr = this.tab2SelectionMembers.map( member => {
            if (member.id !== 0) return member.id
          })
          const memberIds = memberIdsArr.join(',')
          const data = {
            groupId: groupId,
            memberIds: memberIds
          }
          this.isPostMemberGroupLoading = true
          const accessToken = this.$store.getters['auth/accessToken']
          const token = accessToken.token
          const headers = {Authorization: `Bearer ${token}`}
          const response = await this.$axios
            .$post(API_URL_MEMBERS_GROUPS, querystring.stringify({ ...data }),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
            .catch(error => {
              console.log('response error addMembersToGroup', error)
            })
          console.log(response)
          let groupIndex = 0;
          this.groups.forEach((group, index) => {
            if (group.id === groupId) {
              groupIndex = index
            }
          })
          this.tab2SelectionMembers.forEach((member, index) => {
            this.groups[groupIndex].members.push(member)
            this.$delete(this.tab2SelectionMembers[index], index)
          })

          this.getMembers()
          this.isPostMemberGroupLoading = false
        }
      },
      async moveGroup(group) {
        const latestGroupId = group.id
        const preGroupId = this.selectedGroup[0].id
        const memberIdsArr = this.tab1SelectionMembers.map( member => {
          if (member.id !== 0) return member.id
        })
        const memberIds = memberIdsArr.join(',')

        const data = {
          latestGroupId: latestGroupId,
          preGroupId: preGroupId,
          memberIds: memberIds
        }
        this.isMoveGroupLoading = true
        const accessToken = this.$store.getters['auth/accessToken']
        const token = accessToken.token
        const headers = {Authorization: `Bearer ${token}`}
        const response = await this.$axios
          .$put(API_URL_MEMBERS_GROUPS, querystring.stringify({ ...data }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .catch(error => {
            console.log('response error moveGroup', error)
          })
        console.log(response)

        let latestGroupIndex = 0;
        this.groups.forEach((group, groupIndex) => {
          if (group.id === latestGroupId) {
            latestGroupIndex = groupIndex
          }
        })
        this.groups.forEach((group, groupIndex) => {
          if (group.id === preGroupId) {
              memberIdsArr.forEach(id => {
              group.members.forEach((member, memberIndex) =>　{
                if(member.id === id){
                  this.groups[latestGroupIndex].members.push(member)
                  this.$delete(this.groups[groupIndex].members, memberIndex)
                }
              })
            })
          }
        })
        this.getMembers()
        this.isMoveGroupLoading = false
      },
      async removeMember() {
        if (this.selectedGroup.length) {
          const groupId = this.selectedGroup[0].id
          const memberIdsArr = this.tab1SelectionMembers.map( member => {
            if (member.id !== 0) return member.id
          })
          const memberIds = memberIdsArr.join(',')
          const data = {
            groupId: groupId,
            memberIds: memberIds
          }
          
          this.isRemoveMemberLoading = true
          const accessToken = this.$store.getters['auth/accessToken']
          const token = accessToken.token
          const headers = {Authorization: `Bearer ${token}`}
          const response = await this.$axios
            .$delete(API_URL_MEMBERS_GROUPS, {
              headers: headers,
              data: data
            })
            .catch(error => {
              console.log('response error removeMember', error)
            })
          console.log(response)

          this.groups.forEach((group, groupIndex) => {
            if (group.id === groupId) {
               memberIdsArr.forEach(id => {
                group.members.forEach((member, memberIndex) =>　{
                  if(member.id === id){
                    this.$delete(this.groups[groupIndex].members, memberIndex)
                  }
                })
              })
            }
          })
          this.getMembers()
          this.isRemoveMemberLoading = false
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
        groups: response.groups,
        members: response.members
      }
    }
  }
</script>