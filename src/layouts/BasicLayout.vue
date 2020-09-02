<template>
  <div :class="[`nav-theme-${navTheme}`,`nav-ayout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-if="navLayout === 'left'" :theme="navTheme" v-model="collapsed" collapsible  :trigger="null" width='256px'>
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <a-icon v-auth="['admin']" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold' " @click="collapsed = !collapsed" />
          <Header/>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
    <SettingDrawer/>
    </Authorized>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SiderMenu from './SiderMenu'
import SettingDrawer from '@/components/SettingDrawer'
export default {
    components: {
      Header,
      Footer,
      SiderMenu,
      SettingDrawer
    },
    props: {},
    data() {
      return {
        collapsed:false
      };
    },
    watch: {},
    computed: {
      navTheme(){
        return this.$route.query.navTheme || 'dark'
      },
      navLayout(){
        return this.$route.query.navLayout || 'left'
      }
    },
    methods: {},
    created() {},
    mounted() {}
  };
</script>
<style lang="less" scoped>
.trigger{
  padding:0 20px;
  line-height: 64px;
  font-size: 20px;
  &:hover{
    background: #eeeeee;
  }
}
.logo{
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark{
  .logo{
    color: #fff;
  }
}
</style>