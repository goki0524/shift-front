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
        <div class="text-xs-center mt-2">
          <v-btn dark color="indigo" @click="randomizeData()">Randomize data</v-btn>
        </div>

        <v-row justify="center">
          <v-col cols="11" md="3">
            <v-card>
              <v-card-title>スコア</v-card-title>
              <div class="score">89/125</div>
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
              <v-card-title>グループごとスコア</v-card-title>
              <bar-chart :chart-data="latestScoreData" :options="chartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>特性値割合</v-card-title>
              <radar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>特性値推移</v-card-title>
              <bar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>症状出現時間割合</v-card-title>
              <radar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>症状出現時間推移</v-card-title>
              <bar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="11" md="4">
            <v-card>
              <v-card-title>症状出現部位割合</v-card-title>
              <radar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>

          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>症状出現部位推移</v-card-title>
              <bar-chart :chart-data="chartData" :options="chartOptions"/>
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
.score {
  color: darkcyan;
  font-size: 76px;
  text-align: center;
}
</style>


<script>
  import NavDrawer from '~/components/NavDrawer.vue'
  import Footer from '~/components/Footer.vue'
  import colors from 'vuetify/es5/util/colors'

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
        // スコアの推移
        scoreTransitonChartLabels: ['2020/3/12', '2020/3/20', '2020/4/1', '2020/4/20'], //日付
        latestScoreLabels: ['開発部', '経理部', '営業部'],
        chartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
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
      }
    },
    computed: {
      chartData() {
        return {
          datasets: [
            {
              data: this.chartDataValues,
              backgroundColor: this.chartColors,
            },
          ],
          labels: this.chartLabels,
        }
      },
      scoreTransitonChartData() {
        return {
          datasets: [
            {
              label: '全体',
              xAxisID: '日付', // 使用するx軸のID。多軸の場合に指定。
              yAxisID: 'スコア', // 使用するy軸のID。多軸の場合に指定。

              data: [84, 98, 92, 100], // データ列

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

              pointBackgroundColor: '#4444cc', //点の塗りつぶしの色
              pointBorderColor: '#8888ff', // 点の境界線の色
              pointBorderWidth: 3, //点の境界線の幅
              pointRadius: 5, // 点の形状の半径
              pointStyle: 'circle', //点のスタイル

              pointHitRadius: 20, // マウスオーバー検出のために点半径に追加される半径(ピクセル単位)。
              pointHoverBackgroundColor: '#44cc44', // マウスオーバー時の点の背景色。
              pointHoverBorderColor: '#88ff88', // マウスオーバー時の点の境界線の色。
              pointHoverBorderWidth: 3, //マウスオーバー時の点の半径。

              showLine: true, // 線を表示する
              spanGaps: true, // データがない点にも線を引く
              steppedLine: false, // 階段グラフ
            },
            {
              label: '開発部',
              xAxisID: '日付', // 使用するx軸のID。多軸の場合に指定。
              yAxisID: 'スコア', // 使用するy軸のID。多軸の場合に指定。

              data: [64, 78, 72, 120], // データ列

              backgroundColor: 'pink', // 線の下の塗りつぶし色
              borderColor: 'red', // 線の色
              borderWidth: 2, //線の幅

              borderDash: [0], // ダッシュ線のスタイル。[5, 3]など。
              borderDashOffset: 0, // ダッシュ線のオフセット
              borderCapStyle: 'butt', // 線の端の形状。'butt', 'round', or 'square'
              borderJoinStyle: 'bevel', //線の結合スタイル。'bevel', 'round', or 'miter'

              cubicInterpolationMode: 'default', // キュービック補間モード。'default', or 'monotone'
              fill: '', // 塗りつぶしモード
              lineTension: 0.3, // 線のベジェ曲線の張力

              pointBackgroundColor: '#4444cc', //点の塗りつぶしの色
              pointBorderColor: '#8888ff', // 点の境界線の色
              pointBorderWidth: 3, //点の境界線の幅
              pointRadius: 5, // 点の形状の半径
              pointStyle: 'circle', //点のスタイル

              pointHitRadius: 20, // マウスオーバー検出のために点半径に追加される半径(ピクセル単位)。
              pointHoverBackgroundColor: '#44cc44', // マウスオーバー時の点の背景色。
              pointHoverBorderColor: '#88ff88', // マウスオーバー時の点の境界線の色。
              pointHoverBorderWidth: 3, //マウスオーバー時の点の半径。

              showLine: true, // 線を表示する
              spanGaps: true, // データがない点にも線を引く
              steppedLine: false, // 階段グラフ
            },
          ],
          labels: this.scoreTransitonChartLabels,
        }
      },
      latestScoreData() {
        return {
          datasets: [
            {
              data: this.chartDataValues,
              backgroundColor: this.chartColors,
            },
          ],
          labels: this.latestScoreLabels,
        }
      },
    },
    mounted: function() {
      this.randomizeData();
    },
    methods: {
      randomizeData: function() {
        var data = [];
        for (var i = 0; i < this.chartLabels.length; i++) {
          data.push(Math.floor(Math.random() * 100));
        }
        this.chartDataValues = data;
      },
    },
  }
</script>