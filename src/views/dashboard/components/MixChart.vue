<template>

  <div :id="id" :class="className" :style="{height:height, width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import moment from 'moment'

export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          date: '',
          company: '',
          accuracy: 0,
          products_quantity: 0
        }
      }
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    moment.locale('pt-br')
    this.initChart()
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      const chartData = this.chartData
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (var date in chartData.dates) {
          var ptDate = moment(chartData.dates[date]).format('DD/MM/YYYY')
          data.push(ptDate)
        }
        return data
      }())
      this.chart.setOption({
        responsive: true,
        backgroundColor: '#ffffff',
        title: {
          text: 'Contagens realizadas',
          x: '20',
          top: '10',
          textStyle: {
            color: '#202020',
            fontSize: '22'
          },
          subtextStyle: {
            color: 'primary',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: 'black'
            }
          },
          formatter: function(params) {
            var data = params[0].axisValueLabel
            const accuracy = params[0].data
            const company = params[1].data
            const products = params[2].data
            return `
                    <div class="pa-5">
                      <div class="mb-2 ml-2">
                        Empresa: ${company}
                      </div>

                      <div class="mb-2 ml-2">
                        Produtos contados: ${products}
                      </div>

                      <div class="mb-2 ml-2">
                        Acuracidade: ${accuracy.toFixed(2)}
                      </div>

                      <div class="ml-4" /> ${data}<br />
                    </div>
                  `
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: 'black'
          }
        },
        legend: {
          top: '15%',
          textStyle: {
            color: 'primary'
          },
          data: ['Acuracidade']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: 'primary'
            },
            borderColor: '#90979c'

          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: 'Acuracidade',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'primary',
                label: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    color: 'black',
                    top: '10px'
                  },
                  formatter(p) {
                    return p.value > 0 ? `${p.value.toFixed(2)} %` : ''
                  }
                }
              }
            },
            data: this.chartData.accuraciesData
          },
          {
            name: 'Empresa',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'primary',
                label: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    color: 'primary'
                  }
                }
              }
            },
            data: this.chartData.companiesData
          },
          {
            name: 'Qntd. de Produtos',
            type: 'line',
            stack: '',
            symbolSize: 0,
            symbol: '',
            barMaxWidth: 0,
            hidden: true,
            barGap: '0%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128, 0)',
                label: {
                  show: false,
                  position: 'bottom',
                  textStyle: {
                    color: '#fff'
                  }
                }
              }
            },
            data: this.chartData.products_quantityData
          }
        ]
      })
    }
  }
}
</script>
