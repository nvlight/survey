<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys</h1>
                <router-link :to="{name: 'SurveyCreate'}"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 flex focus:bg-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new Survey
                </router-link>
            </div>
        </template>

        <div v-if="surveysLoading" class="text-center">Загрузка...</div>
        <div v-else class="grid grid-cols-1 gap-3 sm:grid-col-2 md:grid-cols-3">
            <SurveyListItem v-for="survey in surveys"
                :key="survey.id" :survey="survey"
                @delete="deleteSurvey"
            />
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const surveys = computed( () => store.state.surveys.data );
const surveysLoading = computed( () => store.state.surveys.loading )

store.dispatch('getSurveys')
    .then((res) => {

    })

function deleteSurvey(survey){
    if (!confirm('Are you sure to delete survey? This action can\'t be cancelled!!')){
        return;
    }
    store.dispatch('deleteSurvey', survey.id)
        .then(res => {
            // сэкономил еще запрос в бд, путем удаления записи в сторе.
            //store.dispatch('getSurveys');
        })
}

</script>

<style></style>
