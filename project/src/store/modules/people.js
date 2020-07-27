import { requestPeopleList } from "../../util/request"
const state = {
    list: []
}

const mutations = {
    changePeopleList(state, arr) {
        state.list = arr
    }
}

const actions = {
    requestPeopleList(context) {
        requestPeopleList().then(res => {
            context.commit("changePeopleList",res.data.list)
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