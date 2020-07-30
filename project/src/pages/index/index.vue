<template>
  <div class="index">
    <el-container class="con">
      <el-aside width="200px">
        <!-- 导航开始 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 有目录 -->
          <!-- <el-submenu
            :index="item.id+''"
            v-for="item in list.menus"
            :key="item.title"
            v-show="hasChildren"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="i.url" v-for="i in item.children" :key="i.title">{{i.title}}</el-menu-item>
          </el-submenu>-->
          <!-- 没有目录 -->
          <!-- <el-menu-item :index="i.url" v-for="i in list.menus" :key="i.id" v-show="!hasChildren">
            <span slot="title">{{i.title}}</span>
          </el-menu-item> -->
          <!-- 混合目录菜单 -->
          <template v-for="item in list.menus">
            <el-submenu :index="item.id+''" :key="item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
            </el-submenu>

            <el-menu-item :index="item.url" :key="item.id" v-if="!item.children">
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
            <span>{{list.username}}</span>
            <el-button type="primary" @click="goOut">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {},
  computed: {
    ...mapGetters({
      list: "login/list",
    }),
    hasChildren() {
      return this.list.menus[0].children ? true : false;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeUser: "login/changeUser",
    }),
    goOut() {
      this.changeUser(null);
      this.$router.push("/login");
    },
  },
  mounted() {
    //console.log(this.list);
  },
};
</script>
<style scoped>
.con {
  width: 100vw;
  height: 100vh;
}
.el-aside {
  background: #000;
}
.el-header {
  background: gray;
}
.user {
  float: right;
}
.user span {
  line-height: 60px;
  color: #fff;
}
.user button {
  vertical-align: middle;
}
.view {
  padding-top: 20px;
}
</style>