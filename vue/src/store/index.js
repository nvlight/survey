import {createStore} from "vuex";
import axiosClient from "../axios.js";

const tmpSurveys = [
    {
        id: 100,
        title: 'the Martin German youtube channel',
        slug: 'the-Martin-German-youtube-channel',
        status: 'true',
        image: "https://items.s1.citilink.ru/1809056_v01_b.jpg",
        description: "My nama is Martin.<br> I am Web Developer with 9+ year of experience, free education com",
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_at: "2021-12-20 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "u3m89uc984ugvn43",
                            text: 'russia',
                        },
                        {
                            uuid: "hj3m487dchn3487h34cf",
                            text: 'germany',
                        },
                        {
                            uuid: "klsjdc893jn89c3df",
                            text: 'italy',
                        },
                        {
                            uuid: "938mcj9834jc9834j34c9",
                            text: 'france',
                        },
                        {
                            uuid: "u3m89uc984ugvn43",
                            text: 'Georgia',
                        },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Your favourite language?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "389j4u9834un859fc43",
                            text: 'php',
                        },
                        {
                            uuid: "j89374nhujfc9834nb9834r",
                            text: 'javacsript',
                        },
                        {
                            uuid: "3984u89t4ybn45990rcun43",
                            text: 'go',
                        },
                        {
                            uuid: "9n843ufv9834nuyb5gv893",
                            text: 'c++',
                        },
                        {
                            uuid: "j98n3fcu89u3498vfcsdfg",
                            text: 'python',
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "checkbox",
                question: "The coolest PHP framework is?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "kljshdfkslnuh87sdv7fhyn8",
                            text: 'laravel',
                        },
                        {
                            uuid: "a9l8mw4mjn98rc489",
                            text: 'symfony',
                        },
                        {
                            uuid: "slkdjf984jn89vr4",
                            text: 'CodeIgniter',
                        },
                        {
                            uuid: "aw984unr98a4uncr984",
                            text: 'CakePHP',
                        },
                        {
                            uuid: "c98aw4unjr984jn98rc",
                            text: 'Yii',
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "radio",
                question: "Best Javascript Frameworks for you is?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "3j84nmtrc8934j89cr439",
                            text: 'React JS',
                        },
                        {
                            uuid: "1sj98cm4r98c4398vrjn8943",
                            text: 'Vue JS',
                        },
                        {
                            uuid: "3jmx8974r3984mxjnr9834j89r4",
                            text: 'Angular',
                        },
                        {
                            uuid: "897n4bty5jh89745utv984u598trcm4j589",
                            text: 'Ember JS',
                        },
                        {
                            uuid: "3q984rmjk9834jnvt89734nh7843",
                            text: 'Svelte JS',
                        },
                    ],
                },
            },
            {
                id: 5,
                type: "select",
                question: "Top 20 Laravel Packages for 2022?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "3984runmic9834um89cr43",
                            text: 'Spatie',
                        },
                        {
                            uuid: "3894nu5983c4un5c8934859",
                            text: 'Laravel Debugbar',
                        },
                        {
                            uuid: "4357n86hy4578h6ct784598mt4",
                            text: 'Ignition',
                        },
                        {
                            uuid: "3489n5uv39804u5v89345",
                            text: 'Laravel Backup',
                        },
                        {
                            uuid: "3498mc5mu9834muc589",
                            text: 'No Captcha',
                        },
                    ],
                },
            },
            {
                id: 6,
                type: "text",
                question: "Your favourite youtube channel is?",
                description: null,
                data: {},
            },
            {
                id: 7,
                type: "textarea",
                question: "What do you think about ASC youtube channel?",
                description: "Write your honest opinion. Everything is anonymous.",
                data: {},
            },
        ],
    },
    {
        id: 101,
        title: 'BESTWAY Mainframe',
        slug: 'BESTWAY-Mainframe',
        status: 'draft',
        image: "https://items.s1.citilink.ru/1809061_v01_b.jpg",
        description: "Самый лучший надувной матрас, правда стоит норм тоже!",
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_at: "2021-12-20 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "123u3m89uc984ugvn43",
                            text: 'russia',
                        },
                        {
                            uuid: "234hj3m487dchn3487h34cf",
                            text: 'germany',
                        },
                        {
                            uuid: "23434klsjdc893jn89c3df",
                            text: 'italy',
                        },
                        {
                            uuid: "34543938mcj9834jc9834j34c9",
                            text: 'france',
                        },
                        {
                            uuid: "dfgu3m89uc984ugvn43",
                            text: 'Georgia',
                        },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Your favourite language?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "45v5389j4u9834un859fc43",
                            text: 'php',
                        },
                        {
                            uuid: "4545v6j89374nhujfc9834nb9834r",
                            text: 'javacsript',
                        },
                        {
                            uuid: "445v563984u89t4ybn45990rcun43",
                            text: 'go',
                        },
                        {
                            uuid: "sdfd9n843ufv9834nuyb5gv893",
                            text: 'c++',
                        },
                        {
                            uuid: "4565j98n3fcu89u3498vfcsdfg",
                            text: 'python',
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "checkbox",
                question: "The coolest PHP framework is?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "453c5454kljshdfkslnuh87sdv7fhyn8",
                            text: 'laravel',
                        },
                        {
                            uuid: "34rc34a9l8mw4mjn98rc489",
                            text: 'symfony',
                        },
                        {
                            uuid: "2234324slkdjf984jn89vr4",
                            text: 'CodeIgniter',
                        },
                        {
                            uuid: "sdf4325aw984unr98a4uncr984",
                            text: 'CakePHP',
                        },
                        {
                            uuid: "c34543c98aw4unjr984jn98rc",
                            text: 'Yii',
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "radio",
                question: "Best Javascript Frameworks for you is?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "34v5343j84nmtrc8934j89cr439",
                            text: 'React JS',
                        },
                        {
                            uuid: "ddsf1sj98cm4r98c4398vrjn8943",
                            text: 'Vue JS',
                        },
                        {
                            uuid: "2343243jmx8974r3984mxjnr9834j89r4",
                            text: 'Angular',
                        },
                        {
                            uuid: "23x4234897n4bty5jh89745utv984u598trcm4j589",
                            text: 'Ember JS',
                        },
                        {
                            uuid: "234343q984rmjk9834jnvt89734nh7843",
                            text: 'Svelte JS',
                        },
                    ],
                },
            },
            {
                id: 5,
                type: "select",
                question: "Top 20 Laravel Packages for 2022?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "34cx53453984runmic9834um89cr43",
                            text: 'Spatie',
                        },
                        {
                            uuid: "sdvf4343894nu5983c4un5c8934859",
                            text: 'Laravel Debugbar',
                        },
                        {
                            uuid: "sdfed4357n86hy4578h6ct784598mt4",
                            text: 'Ignition',
                        },
                        {
                            uuid: "234343489n5uv39804u5v89345",
                            text: 'Laravel Backup',
                        },
                        {
                            uuid: "34c5433498mc5mu9834muc589",
                            text: 'No Captcha',
                        },
                    ],
                },
            },
            {
                id: 6,
                type: "text",
                question: "Your favourite youtube channel is?",
                description: null,
                data: {},
            },
            {
                id: 7,
                type: "textarea",
                question: "What do you think about ASC youtube channel?",
                description: "Write your honest opinion. Everything is anonymous.",
                data: {},
            },
        ],
    },
];

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
        },
        currentSurvey:{
            loading: false,
            data: {},
        },
        //surveys: [...tmpSurveys],
        surveys: {
            loading: false,
            data: {},
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            type: null,
            message: '',
        },
    },
    getters: {
        surveys(state){
            return state.surveys;
        },
        currentSurvey(state){
            return state.currentSurvey.data;
        }
    },
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
        getSurvey({commit}, id){
            commit('setCurrentSurveyLoading', true);
            return axiosClient
                .get(`/survey/${id}`)
                .then( ( res ) => {
                    commit('setCurrentSurvey', res.data);
                    commit('setCurrentSurveyLoading', false);
                    return res;
                })
                .catch( (err) =>{
                    commit('setCurrentSurveyLoading', false);
                    throw err;
                })
        },
        getSurveys({commit}){
            commit('setSurveysLoading', true);
            return axiosClient
                .get(`/survey/`)
                .then( ( res ) => {
                    commit('setSurveys', res.data);
                    commit('setSurveysLoading', false);
                    return res;
                })
                .catch( (err) =>{
                    commit('setSurveysLoading', false);
                    throw err;
                })
        },

        saveSurvey({commit}, survey){
            delete survey.image_url;
            let response;
            if (survey.id){
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then( ( res ) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    })
            }else{
                //let fd = new FormData();
                //fd.append('img', survey.img);
                //console.log(survey);
                response = axiosClient
                    .post('/survey', survey)
                    .then( ( res ) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    })
            }
            return response;
        },
        deleteSurvey({commit}, id){
            return  axiosClient
                .delete(`/survey/${id}`)
                .then( ( res ) => {
                    //debugger;
                    if (res.data.success){
                        commit('deleteSurvey', id);
                    }
                    return res;
                })
                .catch( (err) =>{
                    throw err;
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
        },

        // эти 2 штуки надо удалить, как оказалось они не нужны,
        // todo: for delete
        updateSurvey(state, survey){
            state.surveys = state.surveys.map( s => {
                if (s.id === parseInt(survey.data.id) ){
                    return survey.data;
                }
                return s;
            })
        },
        // todo: for delete
        saveSurvey(state, survey){
            state.surveys = [...state.surveys, survey.data];
        },

        setSurveysLoading(state, value){
            state.surveys.loading = value;
        },
        setCurrentSurveyLoading(state, value){
            state.currentSurvey.loading = value;
        },
        setCurrentSurvey(state, survey){
            state.currentSurvey.data = survey.data;
        },
        setSurveys(state, surveys){
            // debugger;
            state.surveys.data = surveys.data;
        },

        deleteSurvey(state, id){
            state.surveys.data = state.surveys.data.filter(
                s => s.id !== parseInt(id)
            )
        },

        notify(state, {message, type}){
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout( () => {
                state.notification.show = false;
            }, 1500)
        }
    },
    modules: {},
})

export default store;
