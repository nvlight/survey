import {createStore} from "vuex";

const store = createStore({
    // change vite port
    // npm run dev -- --port 5180
    state: {
        user:{
            date: {},
            token: null,
        }
    },
    getters: {},
    actions: {},
    mutations: {},
    modules: {},
})

export default store;
