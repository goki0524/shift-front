import Vue from 'vue'
import { Bar, HorizontalBar, Line, Pie, PolarArea, Radar, Bubble, Scatter, Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('bar-chart', {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})

Vue.component('horizontal-bar-chart', {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})

Vue.component('line-chart', {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})

Vue.component('pie-chart', {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})


Vue.component('doughnut-chart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})