<template>
  <div ref="chartDom"></div>
</template>

<script>
import  echarts from 'echarts'
import debounce from 'lodash/debounce'
import {addListener, removeListener} from 'resize-detector'
export default {
  props:{
    option:{
      type:Object,
      default:()=>{

      }
    }
  },
  created(){
    this.resize = debounce(this.resize ,300)
  },
  mounted() {
    this.renderChart()
    this.myChart = echarts.init(this.$refs.chartDom)
    addListener(this.$refs.chartDom,this.resize)
  },
  watch:{
    option:{
      handler(val){
        this.myChart.setOption(val)
      },
      deep:true
    }
  },
  methods:{
    resize(){
      this.myChart.resize()
    },
    renderChart(){
      this.myChart = echarts.init(this.$refs.chartDom)
      this.myChart.setOption(this.option);
    }
  },
  beforeDestroy(){
    removeListener(this.$refs.chartDom,this.resize)
    this.myChart.dispose()
    this.myChart = null
  }
};
</script>
<style lang="scss" scoped>

</style>