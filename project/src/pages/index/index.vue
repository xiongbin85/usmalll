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
          <el-submenu :index="item.id+''" v-for="item in list.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menuManage">菜单管理</el-menu-item>
            <el-menu-item index="/peopleManage">角色管理</el-menu-item>
            <el-menu-item index="/userManage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城设置</span>
            </template>
            <el-menu-item index="/proClassify">商品分类</el-menu-item>
            <el-menu-item index="/proSize">商品规格</el-menu-item>
            <el-menu-item index="/proManage">商品管理</el-menu-item>
            <el-menu-item index="/vipManage">会员管理</el-menu-item>
            <el-menu-item index="/slideShow">轮播图管理</el-menu-item>
            <el-menu-item index="/activity">秒杀活动</el-menu-item>
          </el-submenu> -->
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
            <span>{{list.username}}</span>
            <el-button type="primary" @click="$router.push('/login')">退出</el-button>
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
  },
  data() {
    return {};
  },
  methods: {},
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