import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res => {
    console.log('响应拦截器' + res.config.url);
    console.log(res);
    return res
})

const baseUrl = "/api"
//const baseUrl = ""
//----------------------------菜单-------------------------------
//菜单添加
export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//菜单列表
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params
    })
}
//删除菜单
export const requestMenuDelete = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//获取单条菜单数据
export const requestMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: params
    })
}
//修改菜单
export const requestMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//----------------------------角色-------------------------------
//角色添加
export const requestPeopleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//角色列表
export const requestPeopleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
//查询单条角色数据
export const requestPeopleDetail = (params) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params
    })
}
//角色修改
export const requestPeopleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//角色删除
export const requestPeopleDelete = (params) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//----------------------------管理员-------------------------------
//管理员添加
export const requestUserAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员总数
export const requestUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}
//管理员列表
export const requestUserList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params
    })
}
//查询单条管理员数据
export const requestUserDetail = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params
    })
}
//更新管理员
export const requestUserUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}
//删除管理员
export const requestUserDelete = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//------------------------------登录-----------------------------
//登录
export const requestLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}
//----------------------------会员-------------------------------
//会员列表
export const requestVipList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}
//单条会员数据
export const requestVipDetail = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params
    })
}
//修改会员数据
export const requestVipUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//-----------------------------商品规格------------------------------
//添加商品规格
export const requestSizeAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//商品规格总数
export const requestSizeCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get"
    })
}
//商品规格列表
export const requestSizeList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params
    })
}
//查询单条商品规格数据
export const requestSizeDetail = (params) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params
    })
}
//更新商品规格
export const requestSizeUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//删除商品规格
export const requestSizeDelete = (params) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//-----------------------------商品分类------------------------------
//商品分类添加
export const requestClassifyAdd = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: form
    })
}
//商品分类列表
export const requestClassifyList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params,
    })
}
//单条商品分类
export const requestClassifyDetail = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}
//修改商品分类
export const requestClassifyUpdate = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: form
    })
}
//删除商品分类
export const requestClassifyDelete = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: params
    })
}
//------------------------------轮播图-----------------------------
//添加轮播图
export const requestBannerAdd = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: form
    })
}
//轮播图列表
export const requestBannerList = (params) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params,
    })
}
//单条轮播图
export const requestBannerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}
//修改轮播图
export const requestBannerUpdate = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: form
    })
}
//删除轮播图
export const requestBannerDelete = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: params
    })
}
//------------------------------商品-----------------------------
//商品添加
export const requestProAdd = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}
//商品总数
export const requestProCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get"
    })
}
//商品列表
export const requestProList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params,
    })
}
//单条商品
export const requestProDetail = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}
//修改商品
export const requestProUpdate = (params) => {
    let form = new FormData();
    for (var i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: form
    })
}
//删除商品
export const requestProDelete = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: params
    })
}
//------------------------------活动-----------------------------
//添加活动
export const requestActivityAdd = (params) =>{
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: params
    })
}
//活动列表
export const requestActivityList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}
//单条活动
export const requestActivityDetail = (params) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}
//修改活动
export const requestActivityUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: params
    })
}
//删除活动
export const requestActivityDelete = (params) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: params
    })
}