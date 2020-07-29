import { requestProList, requestProCount } from "../../util/request"
const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1
}

const mutations = {
    changeProList(state, arr) {
        // arr.forEach(i => {
        //     i.specsattr = JSON.parse(i.specsattr)
        // });
        state.list = arr;
        //console.log(arr);
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    requestProList(context) {
        let params = {
            page: context.state.page,
            size: context.state.size
        }
        requestProList(params).then(res => {
            if (res.data.list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeProList", res.data.list)
        })
    },
    requestAllPro(context) {
        requestProList().then(res => {
            context.commit("changeProList", res.data.list)
        })
    },
    requestProCount(context) {
        requestProCount().then(res => {
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