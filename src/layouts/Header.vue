<template>
  <div class="header">
     <a-dropdown>
      <a-icon type="global" />
      <a-menu slot="overlay" @click="localeChange" :selectedKeys="[$route.query.locale || 'zhCN']">
        <a-menu-item :key="zhCn">
          <a href="javascript:;">中文</a>
        </a-menu-item>
        <a-menu-item :key="enUS">
          <a href="javascript:;">English</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { locale } from 'moment';
export default {
    components: {},
    props: {},
    data() {
      return {
        locale
      };
    },
    watch: {},
    computed: {},
    methods: {
      localeChange({key}){
        this.$router.push({query:{...this.$route.query,locale:key}})
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style lang="less" scoped>
.header{
  float: right;
  margin-right: 30px;
}
</style>