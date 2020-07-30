const state = {
    list: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
}

const mutations = {
    changeLogin(state, arr) {
        state.list = arr
        if (arr) {
            sessionStorage.setItem("user", JSON.stringify(state.list))
        } else {
            sessionStorage.removeItem("user")
        }
        //console.log(state.list);
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