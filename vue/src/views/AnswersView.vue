<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Answers View</h1>
            </div>
        </template>

        <!--        <pre>{{answers}}</pre>-->
        <div v-if="answer.loading" class="text-center">Loading...</div>
        <div v-else>
<!--            <pre>{{answer.value}}</pre>-->
            <div v-if="Object.keys(answer?.value?.data).length">
                <div class="flex">
                    <div><img :src="answer.value.data[0]?.image_url" alt=""></div>
                    <div class="ml-3">
                        <div><span class="font-semibold">Title:</span> {{answer.value.data[0].title}}</div>
                        <div><span class="font-semibold">Slug:</span> {{answer.value.data[0].slug}}</div>
                        <div><span class="font-semibold">Status:</span> {{answer.value.data[0].status}}</div>
                        <div class="mt-2"><span class="font-semibold">Expire_date:</span> {{answer.value.data[0].expire_date}}</div>
                        <div><span class="font-semibold">Start date:</span> {{answer.value.data[0].start_date}}</div>
                        <div><span class="font-semibold">End date:</span> {{answer.value.data[0].end_date}}</div>
                    </div>
                </div>

                <div v-for="(ans, index) of answer.value.data">
                    <div class="mt-3">
                        <span class="font-semibold text-xl">{{index + 1}}. </span>
                        <span class="font-semibold text-xl">Question</span>:
                        <span class="text-xl">{{ans.survey_questions_question}}</span>
                    </div>
                    <div>
                        <span class="font-semibold text-2">Question type</span>:
                        <span class="">{{ans.survey_questions_type}} ({{ans.answer_is}})</span>
                    </div>
                    <div v-if="ans.survey_questions_description">
                        <span class="font-semibold text-2">Question description</span>:
                        <span class="">{{ans.survey_questions_description}}</span>
                    </div>

                    <div><span class="font-semibold">Answer:</span> {{ans.answer}}</div>

                </div>
            </div>
            <div v-else class="text-center">No data!</div>

<!--          <div class="grid grid-cols-1 gap-3 sm:grid-col-2 md:grid-cols-3">-->
<!--                    <AnswerListItem v-for="(answer,index) in answers.data"-->
<!--                                    :key="answer.id"-->
<!--                                    :answer="answer"-->
<!--                                    class="opacity-0 animate-fade-in-down"-->
<!--                                    :style="{animationDelay: `${index * 0.1}s`}"-->
<!--                                    @delete="deleteAnswer"-->
<!--                    />-->
<!--                </div>-->

                <!-- Pagination -->
<!--                <div class="flex justify-center mt-5">-->
<!--                    <nav-->
<!--                        class="relative z-0 inline-flex justify-center rounded-md shadow-sm"-->
<!--                        aria-label="Pagination"-->
<!--                    >-->
<!--                        <a-->
<!--                            v-for="(link, i) of answers.links"-->
<!--                            :key="i"-->
<!--                            :disabled="!link.url"-->
<!--                            v-html="link.label"-->
<!--                            href="#" aria-current="page"-->
<!--                            @click="getForPage($event, link)"-->
<!--                            class="relative inline-flex items-center px-4 py-2 border test-sm font-medium whitespace-nowrap"-->
<!--                            :class="[-->
<!--                                link.active-->
<!--                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'-->
<!--                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100',-->
<!--                                i === 0 ? 'rounded-l-md' : '',-->
<!--                                i === answers.links.length-1 ? 'rounded-r-md' : '',-->
<!--                            ]"-->
<!--                        >-->

<!--                        </a>-->
<!--                    </nav>-->
<!--                </div>-->
                <!--/ Pagination -->
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const store = useStore();
//console.log(route.params);

const answer = computed( () => store.getters["answers/answer"] );

store.dispatch("answers/getAnswer", route.params.id)
    .then()
    .catch()

</script>

<style>
</style>
