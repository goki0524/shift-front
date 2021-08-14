<template>
  <v-app>
    <NavDrawer
      v-model="drawer"
    />
    <v-content>
      <v-container
        v-if="!error"
        class="fill-height"
        fluid
      >
        <v-row justify="center">
          <v-col cols="11" md="3">
            <v-card>
              <v-card-title>スコア</v-card-title>
              <div class="score">{{companyLatestPhysicalScore.score}}/125</div>
              <v-card-subtitle>最新サーベイ配信日:
              {{companyLatestPhysicalScore.deliveryAt}}</v-card-subtitle>
            </v-card>
          </v-col>

          <v-col cols="11" md="8">
            <v-card>
              <v-card-title>スコア推移</v-card-title>
              <line-chart :chart-data="scoreTransitonChartData" :options="scoreTransitonChartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" sm="11">
            <v-card>
              <v-card-title>グループごと最新スコア</v-card-title>
              <bar-chart :chart-data="groupsLatestScoreChartData" :options="groupsLatestScoreChartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>特性値割合</v-card-title>
              <radar-chart :chart-data="characteristicValueRadarChartData" :options="categoryRadarCartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>特性値推移</v-card-title>
              <bar-chart :chart-data="characteristicValueBarChartData" :options="categoryBarChartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>症状出現時間割合</v-card-title>
              <radar-chart :chart-data="chartData" :options="categoryRadarCartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>症状出現時間推移</v-card-title>
              <bar-chart :chart-data="categoryBarChartData" :options="categoryBarChartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>症状出現部位割合</v-card-title>
              <radar-chart :chart-data="chartData" :options="categoryRadarCartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>症状出現部位推移</v-card-title>
              <bar-chart :chart-data="categoryBarChartData" :options="categoryBarChartOptions"/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container
        v-else
        class="fill-height"
        fluid
      >
        <v-row justify="center">
          <h3>データがありません。</h3>
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
.score {
  color: darkcyan;
  font-size: 64px;
  text-align: center;
}
</style>


<script>
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  import colors from 'vuetify/es5/util/colors'
  import { mapGetters } from 'vuex'

  const API_URL_DASHBOARD =  `${process.env.apiUrl}/api/v1/dashboard`

  export default {
    middleware: 'authenticated',
    components: {
      NavDrawer,
      Footer,
    },
    props: {
      source: String,
    },
    data() {
      return {
        drawer: true,
        error: false,
        chartDataValues: [],
        chartColors: [
          colors.red.lighten2,
          colors.blue.lighten2,
          colors.yellow.lighten2,
          colors.green.lighten2,
          colors.orange.lighten2,
          colors.purple.lighten2,
        ],
        chartLabels: ['疲労症状	', '動作時症状 上半身', '動作時症状 下半身', '姿勢保持障害', '内部障害', 'ボディスタイル'],
        categoryRadarCartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
        },
        categoryBarChartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        },
        //スコアの推移
        scoreTransitonChartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
          scales: {
            yAxes: [{
              id: 'スコア', // 軸ID
              ticks: {
                beginAtZero: false
              }
            }],
            xAxes: [{
              id: '日付', // 軸ID
            }]
          }
        },
        //グループごとスコア
        groupsLatestScoreChartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
      }
    },
    computed: {
      ...mapGetters({
        groupsLatestPhysicalScores: 'dashboard/groupsLatestPhysicalScores',
        companyLatestPhysicalScore: 'dashboard/companyLatestPhysicalScore',
        characteristicValueData: 'dashboard/characteristicValueData',
      }),
      chartData() {
         const data = {
          datasets: [
            {
              data: this.chartDataValues,
              backgroundColor: this.chartColors,
              fill: '', // 塗りつぶしモード
            },
          ],
          labels: this.chartLabels,
        }
        return data
      },
      groupsLatestScoreChartData() {
        const groupsLatestPhysicalScores = this.groupsLatestPhysicalScores
        let datasets = []
        let dataObj = {
          label: '',
          data: [],
          backgroundColor: '',
        }
        if (groupsLatestPhysicalScores.length) {
          for (let i = 0; i < groupsLatestPhysicalScores.length; i++) {
            let newObj = Object.assign({}, dataObj)
            newObj.label = groupsLatestPhysicalScores[i].groupName
            newObj.data = [groupsLatestPhysicalScores[i].score]
            newObj.backgroundColor = this.chartColors[i]
            datasets.push(newObj)
          }
        }
        return {
          datasets: datasets,
          labels: ['スコア']
        }
      },
      characteristicValueRadarChartData() {
        const radarChartData = this.characteristicValueData.radarChartData
        const categoryNames = this.characteristicValueData.categoryNames

        const data = {
          datasets: [
            {
              data: radarChartData,
              backgroundColor: 'darkcyan',
              fill: '', // 塗りつぶしモード
              label: '特性値割合',
            },
          ],
          labels: categoryNames,
        }
        return data
      },
      characteristicValueBarChartData() {
        const barChartData = this.characteristicValueData.barChartData
        const datasets = barChartData.datasets
        const labels = barChartData.labels
        return {
          datasets: datasets,
          labels: labels
        }
      },
      scoreTransitonChartData() {
        const scoreTransitions = this.$store.getters['dashboard/scoreTransitions']
        let datasets = []
        let dataObj = {
          label: '',
          data: [], // データ列

          xAxisID: '日付', // 使用するx軸のID。多軸の場合に指定。
          yAxisID: 'スコア', // 使用するy軸のID。多軸の場合に指定。
          backgroundColor: '#ffddcc', // 線の下の塗りつぶし色
          borderColor: '#ff9966', // 線の色
          borderWidth: 2, //線の幅
          borderDash: [0], // ダッシュ線のスタイル。[5, 3]など。
          borderDashOffset: 0, // ダッシュ線のオフセット
          borderCapStyle: 'butt', // 線の端の形状。'butt', 'round', or 'square'
          borderJoinStyle: 'bevel', //線の結合スタイル。'bevel', 'round', or 'miter'
          cubicInterpolationMode: 'default', // キュービック補間モード。'default', or 'monotone'
          fill: '', // 塗りつぶしモード
          lineTension: 0.3, // 線のベジェ曲線の張力
          pointBackgroundColor: '#ff9966', //点の塗りつぶしの色
          pointBorderColor: '#ff9966', // 点の境界線の色
          pointBorderWidth: 3, //点の境界線の幅
          pointRadius: 5, // 点の形状の半径
          pointStyle: 'circle', //点のスタイル
          pointHitRadius: 20, // マウスオーバー検出のために点半径に追加される半径(ピクセル単位)。
          pointHoverBackgroundColor: '#ff9966', // マウスオーバー時の点の背景色。
          pointHoverBorderColor: '#ff9966', // マウスオーバー時の点の境界線の色。
          pointHoverBorderWidth: 3, //マウスオーバー時の点の半径。
          showLine: true, // 線を表示する
          spanGaps: true, // データがない点にも線を引く
          steppedLine: false, // 階段グラフ
        }
        if (scoreTransitions.companyScores.length) {
          let newObj = Object.assign({}, dataObj)
          newObj.label = '全体'
          newObj.data = scoreTransitions.companyScores
          datasets.push(newObj)
        }
        if (scoreTransitions.groups.length) {
          for (let i = 0; i < scoreTransitions.groups.length; i++) {
            let newObj = Object.assign({}, dataObj)
            newObj.label = scoreTransitions.groups[i].groupName
            newObj.data = scoreTransitions.groups[i].scores
            newObj.borderColor = this.chartColors[i]
            newObj.backgroundColor = this.chartColors[i]
            newObj.pointBackgroundColor = this.chartColors[i]
            newObj.pointBorderColor = this.chartColors[i]
            newObj.pointHoverBackgroundColor = this.chartColors[i]
            newObj.pointHoverBorderColor = this.chartColors[i]
            datasets.push(newObj)
          }
        }
        return {
          datasets: datasets,
          labels: scoreTransitions.scoreTransitonChartLabels,
        }
      },
    },
    mounted: function() {
      this.randomizeData()
    },
    methods: {
      randomizeData: function() {
        var data = []
        for (var i = 0; i < this.chartLabels.length; i++) {
          data.push(Math.floor(Math.random() * 100))
        }
        this.chartDataValues = data
      },
    },
    async asyncData({ $axios, query, store }) {
      const accessToken = store.getters['auth/accessToken']
      const token = accessToken.token
      const response = await $axios
      .$get(API_URL_DASHBOARD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.log('response error: ', error)
        return false
      })
      const data = response.data
      if (!data) {
        return {
          error: true
        }
      }
      store.commit('dashboard/setCompanyLatestPhysicalScore', data.companyLatestPhysicalScore)
      store.commit('dashboard/setScoreTransitions', data.scoreTransitions)
      store.commit('dashboard/setGroupsLatestPhysicalScores', data.groupsLatestPhysicalScores)
      store.commit('dashboard/setCharacteristicValueData', data.characteristicValueData)
      return {
        error: false
      }
    }
  }
</script>