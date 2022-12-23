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

        <div v-if="surveys.loading" class="text-center">Loading...</div>
        <div v-else>
            <div v-if="surveys.data.length">
                <div class="grid grid-cols-1 gap-3 sm:grid-col-2 md:grid-cols-3">
                    <SurveyListItem v-for="(survey,index) in surveys.data"
                        :key="survey.id"
                        :survey="survey"
                        class="opacity-0 animate-fade-in-down"
                        :style="{animationDelay: `${index * 0.1}s`}"
                        @delete="deleteSurvey"
                    />
                </div>

                <!-- Pagination -->
                <div class="flex justify-center mt-5">
                    <nav
                        class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <a
                           v-for="(link, i) of surveys.links"
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
                                i === surveys.links.length-1 ? 'rounded-r-md' : '',
                            ]"
                        >

                        </a>
                    </nav>
                </div>
                <!--/ Pagination -->
            </div>
            <div v-else class="flex justify-center">
                You dont have any surveys!
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const surveys = computed( () => store.state.surveys );

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

function getForPage(event, link) {
    event.preventDefault();
    if (!link.url || link.active){
        return;
    }

    store.dispatch("getSurveys", {url: link.url})
}

</script>

<style></style>
