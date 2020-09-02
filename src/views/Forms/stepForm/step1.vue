<template>
  <div class="">
    <a-form layout="horizontal" :form="form">
      <a-form-item label="付款账户" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input 
        v-decorator="[
        'payAccount',
        {
          initialValue:step.payAccount,
          rules:[{required:true, message:'请输入付款帐号'}]
        }
        ]"  
        placeholder="请输入付款帐号" />
      </a-form-item>
      <a-form-item label="收款账号" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <ReceiveAccount
          v-decorator="[
          'receiveAccount',
          {
            initialValue:step.receiveAccount,
            rules:[{required:true,message:'请输入收款账号',
            validator:(rule,value,callback)=>{
              if(value && value.number){
                callback()
              }else{
                callback(false)
              }
            }}]
          }]"
         />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiveAccount from '@/components/ReceiveAccount'
export default {
    components: {
      ReceiveAccount
    },
    props: {},
    data() {
      this.form = this.$form.createForm(this)
      return {
        formItemLayout:{
          labelCol:{span:4},
          wrapperCol:{span:14}
        }
      };
    },
    watch: {},
    computed: {
      step(){
        return this.$store.state.form.step
      }
    },
    methods: {
      handleSubmit(){
        const {form,$router,$store} = this
        form.validateFields((err,values)=>{
          if (!err) {
            $store.commit({
              type:'form/saveStepFormData',
              payload:values
            })
            $router.push('/form/step-form/confirm')
          }
        })
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style lang="scss" scoped>

</style>