<template>
  <a-input-group compact>
    <a-select v-model="type" style="width:130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input style="width:calc(100% - 130px)" defaultValue="input content" v-model="number" @change="handleNumberChange"></a-input>
  </a-input-group>
</template>

<script>
export default {
    components: {},
    props: {
      value:{
        type:Object,
      }
    },
    data() {
      const {type , number} = this.value || {}
      return {
        type:type || 'alipay',
        number:number || ' '
      };
    },
    watch: {
      value(val){
        Object.assign(this,val)
      }
    },
    computed: {},
    methods: {
      handleTypeChange(val){
        this.$emit('change',{...this.value,type:val})
      },
      handleNumberChange(e){
        this.$emit('change',{...this.value,number:e.target.value})
      }
    },
    
    created() {},
    mounted() {}
  };
</script>
<style lang="scss" scoped>

</style>