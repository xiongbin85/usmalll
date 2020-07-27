import { requestClassifyList } from "../../util/request"

const state = {
    list: []
}

const mutations = {
    changeClassifyList(state, arr) {
        state.list = arr;
        console.log(arr);
    }
}

const actions = {
    requestClassifyList(context) {
        requestClassifyList({ istree: true }).then(res => {
            context.commit("changeClassifyList", res.data.list)
        })
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