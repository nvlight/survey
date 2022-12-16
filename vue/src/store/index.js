import {createStore} from "vuex";

const store = createStore({
    state: {
        user:{
            date: {name: 'Martin', age: 33,},
            token: null,
        }
    },
    getters: {},
    actions: {},
    mutations: {},
    modules: {},
})

export default store;
