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
          <v-col cols="12" sm="6">
            <v-card>
              <doughnut-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card>
              <bar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card>
              <horizontal-bar-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card>
              <line-chart :chart-data="chartData" :options="chartOptions"/>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card>
              <pie-chart :chart-data="chartData" :options="chartOptions"/>
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
          colors.red.lighten1,
          colors.blue.lighten1,
          colors.yellow.lighten1,
          colors.green.lighten1,
        ],
        chartLabels: ['red', 'blue', 'yellow', 'green'],
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