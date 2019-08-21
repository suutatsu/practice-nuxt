<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import Chart from 'chart.js'
import { Pie, mixins } from 'vue-chartjs'

@Component({})
export default class PieChart extends Mixins(Pie, mixins.reactiveProp) {
  @Prop({ require: true })
  readonly chartSource: {
    type: { string: number }
  }

  @Prop({ require: true })
  readonly colors: {
    type: string[]
  }

  @Prop({ default: null })
  readonly title: {
    type: String
  }

  isArray = Array.isArray
    ? function(obj) {
        return Array.isArray(obj)
      }
    : function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
      }

  getValueAtIndexOrDefault = (value, index, defaultValue) => {
    if (value === undefined || value === null) {
      return defaultValue
    }

    if (this.isArray(value)) {
      return index < value.length ? value[index] : defaultValue
    }

    return value
  }

  private chartData: Chart.ChartData = {
    labels: this.labels,
    datasets: [
      {
        backgroundColor: this.colors,
        data: this.dataSource
      }
    ]
  }

  private chartOptions: Chart.chartOptions = {
    title: {
      display: true,
      text: `${this.title} (${this.totalNum}件)`
    },
    legend: {
      position: 'bottom',
      onClick: () => {},
      labels: {
        fontSize: 13,
        generateLabels: chart => {
          chart.legend.afterFit = function() {
            const width = this.width
            this.lineWidths = this.lineWidths.map(function() {
              return width
            })
          }

          const data = chart.data
          if (data.datasets.length) {
            return data.datasets.map((dataset, i) => {
              const meta = chart.getDatasetMeta(0)
              const arc = meta.data[i]
              const custom = (arc && arc.custom) || {}
              const getValueAtIndexOrDefault = this.getValueAtIndexOrDefault
              const arcOpts = chart.options.elements.arc
              const fill = custom.backgroundColor
                ? custom.backgroundColor
                : getValueAtIndexOrDefault(
                    dataset.backgroundColor,
                    i,
                    arcOpts.backgroundColor
                  )
              const stroke = custom.borderColor
                ? custom.borderColor
                : getValueAtIndexOrDefault(
                    dataset.borderColor,
                    i,
                    arcOpts.borderColor
                  )
              const bw = custom.borderWidth
                ? custom.borderWidth
                : getValueAtIndexOrDefault(
                    dataset.borderWidth,
                    i,
                    arcOpts.borderWidth
                  )

              return {
                text: dataset.label,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(dataset.data[i]) || meta.data[i].hidden,

                // Extra data used for toggling the correct item
                index: i
              }
            })
          }
          return []
        }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          dataArr.map(data => {
            sum += data
          })
          const percentage = ((value * 100) / sum).toFixed(2) + '%'
          return percentage
        },
        color: '#fff'
      }
    }
  }

  get totalNum(): number {
    let num = 0
    Object.keys(this.chartSource).map(
      (key: string): void => {
        num += this.chartSource[key]
      }
    )
    return num
  }

  get labels(): Array {
    const labels: Array = []
    Object.keys(this.chartSource).map((dataKey: string, index: number) => {
      labels.push(`${dataKey} (${this.chartSource[dataKey]}件)`)
    })
    return labels
  }

  get dataSource(): Array {
    const data: Array = []
    Object.keys(this.chartSource).map((dataKey: string, index: number) => {
      data.push(this.chartSource[dataKey])
    })
    return data
  }

  public mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>

<style scoped>
.pieChart text {
  font-family: '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', 'メイリオ',
    sans-serif;
}
</style>
