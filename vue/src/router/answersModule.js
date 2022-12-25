import axiosClient from "../axios.js";

export const answersModule = {
    state(){
        return {
            answers: {
                loading: false,
                links: [],
                data: [],
            },
            answer: {
                loading: false,
                value: {},
            },
        }
    },
    getters: {
        answers(state){
            return state.answers;
        },
        answer(state){
            return state.answer;
        },
        // sum111(state){
        //     return state.roomJobs
        //         .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
        // },
        // sumByRoomId: (state) => (room_id) => {
        //     return state.roomJobs.filter( t => t.room_id === room_id)
        //         .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 )
        // }
    },
    actions: {
        getAnswers({commit}, {url = null} = {}){
            url = url || '/answer'
            commit('setAnswersLoading', true);
            return axiosClient
                .get(`${url}`)
                .then( ( res ) => {
                    commit('setAnswers', res.data);
                    commit('setAnswersLoading', false);
                    return res;
                })
                .catch( (err) =>{
                    commit('setAnswersLoading', false);
                    throw err;
                })
        },
        getAnswer({commit}, answer_id){
            commit('setAnswerLoading', true);
            return axiosClient
                .get(`answer/${answer_id}`)
                .then( ( res ) => {
                    commit('setAnswer', res.data);
                    commit('setAnswerLoading', false);
                    return res;
                })
                .catch( (err) =>{
                    commit('setAnswerLoading', false);
                    throw err;
                })
        },
        deleteAnswer({commit}, answer_id){
            return axiosClient
                .delete(`answer/${answer_id}`)
                .then( ( res ) => {
                    if (res.data.success){
                        commit('deleteAnswer', answer_id)
                    }
                    return res;
                })
                .catch( (err) =>{
                    throw err;
                })
        },
    },
    mutations: {
        addJob: (state, job) => {
            state.roomJobs.unshift(job);
        },
        deleteJob: (state, roomjobId) => {
            state.roomJobs = state.roomJobs.filter(
                t => t.id != roomjobId
            );
        },

        setAnswers(state, surveys){
            // debugger;
            state.answers.data = surveys.data;
            state.answers.links = surveys.meta.links;
        },
        setAnswersLoading(state, value){
            state.answers.loading = value;
        },

        setAnswerLoading(state, value){
            state.answer.loading = value;
        },
        setAnswer(state, answer){
            state.answer.value = answer;
        },

        deleteAnswer(state, id){
            state.answers.data = state.answers.data.filter(
                s => s.id !== parseInt(id)
            )
        },
    },
    namespaced: true,
}
