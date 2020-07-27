import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { state, mutations, getters } from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import people from "./modules/people"
import user from "./modules/user"
import login from "./modules/login"
import vip from "./modules/vip"
import size from "./modules/size"
import classify from "./modules/classify"
import banner from "./modules/banner"
import pro from "./modules/pro"
import activity from "./modules/activity"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        people,
        user,
        login,
        vip,
        size,
        classify,
        banner,
        pro,
        activity
    }
})