<template>
  <div v-if="config?.data?.labels">
    <Line
      :data="config.data"
      :options="config.options"
      :height="0"
      :width="0"
      ref="chart"
    />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
  name: 'linechart',
  components: {Line},
  props: ['labels', 'datasets','options'],
  data() {
    return {
      config: {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: this.options
      }
    }
  },
  mounted() {
    // console.log(this.$refs.chart)
    // console.log(this.config)
  },
}
</script>

<style lang="scss" scoped>
div {
  padding: 16px;
  border-radius: var(--border-radius);
  background: #0C0C0C;
  canvas {
    max-width: 100%;
  }
}
</style>
