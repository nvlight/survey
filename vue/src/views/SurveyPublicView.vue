<template>
    <div class="py-5 px-8">
        <div v-if="loading" class="flex justify-center">Loding...</div>
        <div v-else>
<!--            <pre>{{survey}}</pre>-->

            <form @submit.prevent="submitSurvey" class="container mx-auto">
                <div class="grid grid-cols-6 items-center">
                    <div class="mr-4">
                        <img :src="survey.image_url" alt="">
                    </div>
                    <div class="col-span-5">
                        <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
                        <p class="text-gray-500 text-sm" v-html="survey.description"></p>

                    </div>
                </div>

                <div v-if="surveyFinished"
                    class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto"
                >
                    <div class="text-xl mb-3 font-semibold">
                        Thank you for participating in this survey!
                    </div>
                    <button @click="submitAnatherResponse" type="button"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm
                        font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit anather response
                    </button>
                </div>

                <div v-else>
                    <hr class="my-3" />
                    <!-- survey questions -->
                    <div v-for="(question, i) of survey.questions"
                        :key="question.id">
                        <QuestionViewer
                            v-model="answers[question.id]"
                            :question="question"
                            :index="i"
                        />
                    </div>
                    <!--/ survey questions -->

                    <button
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm
                        font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import QuestionViewer from "../components/viewer/QuestionViewer.vue"

const route = useRoute();
const store = useStore();

const loading = computed( () => store.state.currentSurvey.loading )
const survey  = computed( () => store.state.currentSurvey.data )

const surveyFinished = ref(false);
const answers = ref({});

store.dispatch("getSurveyBySlug", route.params.slug)

function submitSurvey(){
    console.log(JSON.stringify(answers.value, undefined, 2));
    store
        .dispatch("saveSurveyAnswer", {
            surveyId: survey.value.id,
            answers: answers.value,
        })
        .then( response => {
            if (response.data.success){
                surveyFinished.value = true;
            }
        });
}

function submitAnatherResponse() {
    answers.value = {};
    surveyFinished.value = false;
}

</script>

<style></style>
