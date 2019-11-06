<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts' // 引入echarts
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import containerServer from './../../../../api/containerServer'
const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    datas: {
      type: Object,
      default: null
    },
    day: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'year'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      dataInfo: [],
      chart: null
    }
  },
  watch: {
    datas(newValue, oldValue) {
      const dataInfo = []
      dataInfo.push(newValue.conFinishRate)
      dataInfo.push(newValue.conTimelyRate)
      dataInfo.push(newValue.toArkTimelyRate)
      dataInfo.push(newValue.timelyRate)
      dataInfo.push(newValue.lessRate)
      this.dataInfo = dataInfo
      this.setOption()
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },
    async setOption() {
      this.chart.off('click')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: '{c}%',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['装柜完成率', '装柜及时率', '到柜及时率', '订舱及时率', '发货短装率'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {  
            show: true,  
            interval: 'auto',  
            formatter: '{value} %'  
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '完成率',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: this.dataInfo,
          itemStyle: {
            normal: {
              color: 'rgb(0, 80, 179)',
              borderColor: '',
              borderWidth: 0,
            }
          },
          animationDuration
        }]
      })
      this.chart.on('click', async(params) => {
        // 将选中日期转成数组
        const dayList = this.day.split('-').map(e => parseInt(e))
        let url = null
        let start = null
        let end = null
        if (this.type === 'year') {
          start = dayList[0] + '-01-01'
          end = dayList[0] + '-12-31'
        } else if (this.type === 'month') {
          const nextMonthFirstDay = new Date(dayList[0], dayList[1] + 1, 1)
          const dis = nextMonthFirstDay.getTime() - 24 * 60 * 60 * 1000 // 减去一天就是这个月的最后一天
          const lastDay = new Date(dis).getDate()
          start = dayList[0] + '-' + ((dayList[1] > 9) ? '' : '0') + dayList[1] + '-01'
          end = dayList[0] + '-' + ((dayList[1] > 9) ? '' : '0') + dayList[1] + '-' + lastDay
        } else if (this.type === 'day') {
          start = dayList[0] + '-' + ((dayList[1] > 9) ? '' : '0') + dayList[1] + '-' + ((dayList[2] > 9) ? '' : '0') + dayList[2]
          end = dayList[0] + '-' + ((dayList[1] > 9) ? '' : '0') + dayList[1] + '-' + ((dayList[2] > 9) ? '' : '0') + dayList[2]
        }
        const res = await containerServer.search({
          type: 'OMSIP'
        })
        const urlTo = res.data.data.OMSprod
        switch (params.name) {
          case '装柜完成率':
            url = '/report-manage/report-CW/tow-cabinet-report'
            break
          case '装柜及时率':
            url = '/report-manage/report-CW/tow-cabinet-report'
            break
          case '到柜及时率':
            url = '/report-manage/report-CW/tow-cabinet-report'
            break
          case '订舱及时率':
            url = '/report-manage/report-CW/book-space-good-info'
            break
          case '发货短装率':
            url = urlTo + 'fssc_attachservlet?param0=sale_notice_call_account_rpt'
            break
          default:
            break
        }
        if (url !== null) {
          if (params.name === '发货短装率') {
            url += '&param1=' + start + '&param2=' + end
            window.open(url, '_blank')
          } else {
            url += '?start=' + start + '&end=' + end
            this.$router.push({
              path: url
            })
          }
        }
      })
    }
  }
}
</script>
