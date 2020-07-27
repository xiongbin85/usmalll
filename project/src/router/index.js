import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login", //登录页
      component: () => import("../pages/login/login")
    },
    {
      path: "/", //主页
      component: () => import("../pages/index/index"),
      children: [{
        path: "home",  //首页
        component: () => import("../pages/home/home")
      },
      //系统设置
      {
        path: "userManage", //管理员管理
        component: () => import("../pages/userManage/userManage"),
        name:"管理员列表"
      },
      {
        path: "menuManage",//菜单管理
        component: () => import("../pages/menuManage/menuManage"),
        name:"菜单列表"
      },
      {
        path: "peopleManage",//角色管理
        component: () => import("../pages/peopleManage/peopleManage"),
        name:"角色列表"
      },
      //商城管理
      {
        path: "proClassify", //商品分类
        component: () => import("../pages/proClassify/proClassify"),
        name:"商品分类列表"
      },
      {
        path: "proSize", //商品规格
        component: () => import("../pages/proSize/proSize"),
        name:"商品规格列表"
      },
      {
        path: "proManage", //商品管理
        component: () => import("../pages/proManage/proManage"),
        name:"商品管理列表"
      },
      {
        path: "vipManage", //会员管理
        component: () => import("../pages/vipManage/vipManage"),
        name:"会员管理列表"
      },
      {
        path: "slideShow", //轮播图管理
        component: () => import("../pages/slideShow/slideShow"),
        name:"轮播图管理列表"
      }, {
        path: "activity", //秒杀活动
        component: () => import("../pages/activity/activity"),
        name:"秒杀活动列表"
      },
      {
        path: "",
        redirect: "home"
      }]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})
