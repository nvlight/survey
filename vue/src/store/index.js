import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
    // change vite port
    // npm run dev -- --port 5180
    state: {
        user:{
            // data: {
            //     name: 'Martin German',
            //     email: 'martin@example.com',
            //     imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            // },
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    actions: {
        register({commit}, user){
            return axiosClient.post('/register', user)
                .then( ({data}) => {
                    if (data.success){
                        commit('setUser', data);
                    }
                    return data;
                })
        },

        login({commit}, user){
            return axiosClient.post('/login', user)
                .then( ({data}) => {
                    if (data.success){
                        commit('setUser', data);
                    }
                    return data;
                })
        },

        logout({commit}){
            return axiosClient.post('/logout')
                .then( ({data}) => {
                    if (data.success){
                        commit('logout');
                    }
                    return data;
                })
        },

    },
    mutations: {
        logout(state){
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        // mg@mail.ru 123456789aA_
        setUser(state, data){
            state.user.data  = data.user;
            state.user.token = data.token;
            sessionStorage.setItem('TOKEN',  data.token);
        }
    },
    modules: {},
})

export default store;
