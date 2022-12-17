import {createStore} from "vuex";

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
            return fetch(`http://survey:87/api/register`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
            })
                .then( (res) => res.json() )
                .then( (res) => {
                    if (res.success){
                        commit('setUser', res);
                    }
                    return res;
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
