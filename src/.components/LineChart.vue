<template>
  <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="props.chartId" :dataset-id-key="props.datasetIdKey"
    :plugins="props.plugins" :css-classes="props.cssClasses" :styles="props.styles" :width="props.width" :height="props.height" />
</template>
  
<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

const props = defineProps({
  defaultChartData: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
    ]
  },

  chartId: {
    type: String,
    default: 'line-chart'
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 200
  },
  cssClasses: {
    default: '',
    type: String
  },
  styles: {
    type: Object,
    default: () => { }
  },
  plugins: {
    type: Array,
    default: () => []
  }
})

const chartData = props.defaultChartData

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

</script>