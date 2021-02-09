<template>
  <div class="chart-container">
    <chart
      height="80%"
      width="100%"
      :chart-data="chartData"
    />
  </div>
</template>

<script>
import Chart from './MixChart'

export default {
  name: 'MixChart',
  components: { Chart },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

