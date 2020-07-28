import Vue from 'vue'
import Router from 'vue-router'
import login from "../store/modules/login"

Vue.use(Router)
//只有含有相应的权限才能访问相应的路由
function hasPower(url) {
  return login.state.list.menus_url.some(i => i == url)
}

let router = new Router({
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
        name: "管理员列表",
        beforeEnter(to, from, next) {
          hasPower("/userManage") ? next() : next("/home")
        }
      },
      {
        path: "menuManage",//菜单管理
        component: () => import("../pages/menuManage/menuManage"),
        name: "菜单列表",
        beforeEnter(to, from, next) {
          hasPower("/menuManage") ? next() : next("/home")
        }
      },
      {
        path: "peopleManage",//角色管理
        component: () => import("../pages/peopleManage/peopleManage"),
        name: "角色列表",
        beforeEnter(to, from, next) {
          hasPower("/peopleManage") ? next() : next("/home")
        }
      },
      //商城管理
      {
        path: "proClassify", //商品分类
        component: () => import("../pages/proClassify/proClassify"),
        name: "商品分类列表",
        beforeEnter(to, from, next) {
          hasPower("/proClassify") ? next() : next("/home")
        }
      },
      {
        path: "proSize", //商品规格
        component: () => import("../pages/proSize/proSize"),
        name: "商品规格列表",
        beforeEnter(to, from, next) {
          hasPower("/proSize") ? next() : next("/home")
        }
      },
      {
        path: "proManage", //商品管理
        component: () => import("../pages/proManage/proManage"),
        name: "商品管理列表",
        beforeEnter(to, from, next) {
          hasPower("/proManage") ? next() : next("/home")
        }
      },
      {
        path: "vipManage", //会员管理
        component: () => import("../pages/vipManage/vipManage"),
        name: "会员管理列表",
        beforeEnter(to, from, next) {
          hasPower("/vipManage") ? next() : next("/home")
        }
      },
      {
        path: "slideShow", //轮播图管理
        component: () => import("../pages/slideShow/slideShow"),
        name: "轮播图管理列表",
        beforeEnter(to, from, next) {
          hasPower("/slideShow") ? next() : next("/home")
        }
      }, {
        path: "activity", //秒杀活动
        component: () => import("../pages/activity/activity"),
        name: "秒杀活动列表",
        beforeEnter(to, from, next) {
          hasPower("/activity") ? next() : next("/home")
        }
      },
      {
        path: "",
        redirect: "home"
      }]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})
//全局守卫登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
    //console.log(login);
    return;
  }
  //用户只能进入登陆页面，不能访问其他页面
  if (login.state.list) {
    next();
    return;
  }
  next("/login")
})


export default router