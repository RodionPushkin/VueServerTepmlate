<template>
  <div class="shadow">
    <Bar
      :chartData="config.data"
      :height="0"
      :width="0"
    />
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'barchart',
  components: {Bar},
  props: ['labels', 'datasets'],
  data() {
    return {
      config: {
        type: 'bar-chart',
        data: {
          labels: this.labels,
          datasets: this.datasets
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  padding: 16px;
  border-radius: var(--border-radius);
  background: var(--bg-color);

  canvas {
    max-width: 100%;
    max-height: 500px;
  }
}
</style>
