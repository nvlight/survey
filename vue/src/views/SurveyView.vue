<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    {{ route.params.id ? model.title : "Create a Survey" }}
                </h1>

                <button v-if="route.params.id"
                    @click="deleteSurvey"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600 focus:bg-red-700"
                >
                    <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                             class="w-6 h-6 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <span>Delete Survey</span>
                    </div>
                </button>
            </div>
        </template>

<!--        <pre>{{ $store.getters.currentSurvey }}</pre>-->
<!--        <pre>{{ model.img}}</pre>-->

        <div v-if="surveyLoading" class="text-center">Загрузка...</div>
        <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
            <div class="border shadow sm:rounded-md sm:overflow-hidden">

                <!-- Survey fileds -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <!-- tmp img -->
<!--                    <div>-->
<!--                        <div>img again</div>-->
<!--                        <input @change="imgChange" type="file" name="img">-->
<!--                    </div>-->
                    <!--/ tmp img -->

                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden
                                        bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                     class="w-[80%] h-[80%] text-gray-300">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </span>
                            <button type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300
                                    rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700
                                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    focus:ring-indigo-500"
                                >
                                <input type="file" name="image"
                                    @change="onImageChoose"
                                    class="opacity-0 absolute left-0 top-0 right-0 bottom-0">
                                Change
                            </button>
                        </div>
                    </div>
                    <!--/ Image -->

                    <!-- Title -->
                    <div>
                        <label class="text-sm block font-medium text-gray-700">Title
                            <input type="text" name="title"
                                v-model="model.title"
                                autocomplete="survey_title"
                                class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                                        focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <!--/ Title -->

                    <!-- Description -->
                    <div>
                        <label class="text-sm block font-medium text-gray-700">Description
                            <div class="mt-1">
                                <textarea name="description"
                                    rows="3"
                                    v-model="model.description"
                                    autocomplete="survey_description"
                                    placeholder="Describe your survey"
                                    class="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md
                                            focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </label>
                    </div>
                    <!--/ Description -->

                    <!-- Expire Date -->
                    <div>
                        <label class="text-sm block font-medium text-gray-700">Expire Date
                            <input type="date" name="expire_data"
                                   v-model="model.expire_data"
                                   autocomplete="survey_title"
                                   class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                                        focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <!--/ Expire Date -->

                    <!-- Status -->
                    <div >
                        <label class="flex items-center">
                            <div class="flex items-center h-5">
                                <input name="status" type="checkbox" v-model="model.status"
                                    class="h-4 w-4  border-gray-300 rounded
                                        text-indigo-600 focus:ring-indigo-500"
                                />

                            </div>
                            <span class="ml-2">Active</span>
                        </label>

                    </div>
                    <!--/ Status -->
                </div>
                <!--/ Survey fileds -->

                <!-- Questions -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions

                        <!-- Add new questions button-->
                        <button type="button" @click="addQuestion"
                            class="flex items-center text-sm py-1.5 px-4 rounded-sm text-white bg-gray-600
                                hover:bg-gray-700 focus:bg-gray-800"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                 class="w-4 h-4 mr-1 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add question
                        </button>
                        <!--/ Add new questions button-->
                    </h3>

                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                    </div>
                    <div v-else>
                        <div v-for="(question, index) in model.questions" :key="question.id"
                        >
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            />
                        </div>
                    </div>

                </div>
                <!--/ Questions -->

                <!-- Save button -->
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                        class="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm
                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                <!--/ Save button -->
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import QuestionEditor from "../components/editor/QuestionEditor.vue"
import { ref, watch, computed } from "vue"
import {useRoute, useRouter} from "vue-router"
import store from "../store/index.js";
import { v4 as uuidv4 } from "uuid"

const router = useRouter();
const route = useRoute(); // use current route

let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    expire_data: null,
    questions: [],
    img: null,
});

const surveyLoading = computed( () => store.state.currentSurvey.loading)

watch(
    () => store.state.currentSurvey.data,
    (nv, ov) => {
        model.value = {
            ...JSON.parse(JSON.stringify(nv)),
            status: nv.status !== "draft",
        }
    }
);

if (route.params.id){
    store.dispatch('getSurvey', route.params.id);

    // этот вариант не работал какое-то время, но потом заработал
    //model.value = store.state.surveys.find(
    //   s => s.id === parseInt(route.params.id)
    //)
    //console.log('find: ',model.value);

    // этот вариант вроде бы работал все время.
    // const currSurvey = store.state.surveys.filter(
    //     s => s.id === parseInt(route.params.id)
    // )
    // console.log(currSurvey);
    // let cs2 = null;
    // if (currSurvey.length){
    //     model.value = currSurvey[0];
    //     cs2 = currSurvey[0];
    // }
    // console.log(currSurvey.length);
    // console.log(cs2);
}

function questionChange(question){
    model.value.questions = model.value.questions.map(
        q => {
            if (q.id === question.id){
                // todo для успокоения (не точно) сделать json parse/stringify
                return question;
                //return JSON.parse(JSON.stringify(question));
            }
            return q;
        }
    )
}

function addQuestion(index){
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {},
    }

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question){
    model.value.questions = model.value.questions.filter(i => i.id !== question.id);
}

function saveSurvey(){
    store.dispatch("saveSurvey", model.value)
        .then( ({data}) => {
            if (data.data.success){
                store.commit('notify', {
                    message: 'Successfully saved!',
                    type: 'success',
                })
            }
            router.push({
                name: "SurveyView",
                params: { id: data.data.id},
            });
        })
}

function deleteSurvey() {
    if (!confirm('Really delete survey?')) { return; }

    store.dispatch("deleteSurvey", model.value.id)
        .then(res => {
            //console.log('deleteSurvey: ', res.data.success);
            if (res.data.success){
                router.push({
                    name: 'Surveys',
                })
            }
        })
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        model.value.image = reader.result;
        model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);
}

function imgChange(ev){
    model.value.img = ev.target.files[0];
    console.log(model.value.img);
}

</script>

<style scoped>

</style>
