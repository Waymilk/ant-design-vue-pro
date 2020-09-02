import Vue from "vue";
import {Button,Layout,Icon,Drawer,Radio,Menu,Form,Input,Select,LocaleProvider,Dropdown,DatePicker} from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'nprogress/nprogress.css'
import Authorized from './components/Authorized'
import Auth from './directives/auth'
// import 'ant-design-vue/dist/antd.less'
// import 'ant-design-vue/lib/button/style'
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component('Authorized',Authorized)
Vue.use(Auth)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(LocaleProvider)
Vue.use(Dropdown)
Vue.use(DatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");