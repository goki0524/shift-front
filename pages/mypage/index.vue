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
            </v-card>
          </v-col>

          <v-col cols="11" md="8">
            <v-card>
              <v-card-title>スコア推移</v-card-title>
              <line-chart :chart-data="chartData" :options="chartOptions"/>
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
        latestScoreLabels: ['開発部', '経理部', '営業部'],
        chartOptions: {
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
          },
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