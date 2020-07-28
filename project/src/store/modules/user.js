import { requestUserList, requestUserCount } from "../../util/request"
const state = {
    list: [],
    size: 3,
    total: 0,
    page: 1
}

const mutations = {
    changeUserList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    requestUserList(context) {
        let params = {
            page: context.state.page,
            size: context.state.size
        }
        requestUserList(params).then(res => {
            if (res.data.list.length==0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeUserList", res.data.list)
        })
    },
    requestUserCount(context) {
        requestUserCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    changePage(context, page) {
        context.commit("changePage", page)
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}