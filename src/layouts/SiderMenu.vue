<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click="()=>$router.push({path:item.path,query:$route.query})">
          <a-icon :type="item.meta.icon" v-if="item.meta.icon" />
          <span>{{ item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu' 
export default {
  props:{
    theme:{
      type:String,
      default:'dark'
    }
  },
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys:this.selectedKeysMap[this.$route.path],
      openKeys:this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  computed:{
    navTheme(){
      return this.$route.query.navTheme || 'dark'
    }
  },
  watch:{
    '$route.path'(val){
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [],parentKeys = [],selectedKey){
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          console.log(item,11)
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]
          const newItem = {...item};
          delete newItem.children
          if (item.children && !item.hideInChildrenMenu) {
            newItem.children = this.getMenuData(item.children,[...parentKeys,item.path])
          }else{
            this.getMenuData(item.children,selectedKey ? parentKeys : [...parentKeys,item.path] , selectedKey || item.path)
          }
          menuData.push(newItem)
        }else if (!item.hideInMenu && !item.hideInChildrenMenu && item.children) {
          menuData.push(...this.getMenuData(item.children,[...parentKeys,item.path]))
        }
      });
      return menuData
    }
  },
};
</script>
