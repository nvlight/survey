<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Answers</h1>

                <div class="flex items-center ">
                    <select v-model="survey_slug_filter"
                        class="rounded-md border-gray-300 ml-2"
                        >
                        <option value="">Survey slug filter</option>
                        <option v-for="(ss, index) in survey_slugs"
                            :key="index" :value="ss"
                            >{{ ss }}
                        </option>
                    </select>
                    <div class="ml-2 font-semibold cursor-pointer" @click="resetSurveySlugFilter">Reset filter</div>
                </div>
            </div>
        </template>

<!--        <pre>{{answers}}</pre>-->
        <div v-if="answers.loading" class="text-center">Loading...</div>
        <div v-else>
            <div v-if="answers.data.length">
                <div class="grid grid-cols-1 gap-3 sm:grid-col-2 md:grid-cols-3">
                    <AnswerListItem v-for="(answer,index) in answers.data"
                        :key="answer.id"
                        :answer="answer"
                        class="opacity-0 animate-fade-in-down"
                        :style="{animationDelay: `${index * 0.1}s`}"
                        @delete="deleteAnswer(answer.id)"
                    />
                </div>

                <!-- Pagination -->
                <div class="flex justify-center mt-5">
                    <nav
                        class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <a
                           v-for="(link, i) of answers.links"
                           :key="i"
                           :disabled="!link.url"
                           v-html="link.label"
                           href="#" aria-current="page"
                           @click="getForPage($event, link)"
                           class="relative inline-flex items-center px-4 py-2 border test-sm font-medium whitespace-nowrap"
                           :class="[
                                link.active
                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100',
                                i === 0 ? 'rounded-l-md' : '',
                                i === answers.links.length-1 ? 'rounded-r-md' : '',
                            ]"
                        >

                        </a>
                    </nav>
                </div>
                <!--/ Pagination -->
            </div>
            <div v-else class="flex justify-center">
                You dont have any survey answers!
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed, ref, watch} from "vue";
import AnswerListItem from "../components/AnswerListItem.vue";

const answers = computed( () => store.getters["answers/answers"] );
const survey_slugs = [
    'php8-updated',
    'vuejs',
    'laravel-eloquent',
    'laravel',
    'javascript',
    'vuex',
    'vue-router',
    'mysql-8',
];
const survey_slug_filter = ref('');

getAnswers();

function getAnswers(){
    store.dispatch('answers/getAnswers')
        .then((res) => {
    })
}

function deleteAnswer(answer_id){
    if (!confirm('Are you sure to delete answer? This action can\'t be cancelled!!')){
        return;
    }
    //console.log()
    store.dispatch('answers/deleteAnswer', answer_id)
        .then(res => {
            // ?????????????????? ?????? ???????????? ?? ????, ?????????? ???????????????? ???????????? ?? ??????????.
            //store.dispatch('getSurveys');
        })
}

function resetSurveySlugFilter(){
    survey_slug_filter.value = '';
}

watch(
    () => survey_slug_filter.value,
    (nv, ov) => {
        store.dispatch('answers/getAnswers', {'survey_filter': survey_slug_filter.value })
            .then((res) => {
            })
    }
);

</script>

<style></style>
