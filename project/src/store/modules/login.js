import { requestLogin } from "../../util/request"
const state = {
    list: {}
}

const mutations = {
    changeLogin(state, arr) {
        state.list = arr
    }
}

const actions = {
    changeUser(context, params) {
        context.commit("changeLogin", params)
        
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}