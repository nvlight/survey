<template>
    <!-- Question index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1}}. {{ model.question}}
        </h3>

        <div class="flex items-center">
            <!-- Add new question -->
            <button type="button" @click="addQuestion"
                class="flex items-center text-xs py-1 px-3 mr-2 bg-gray-600 text-white rounded-sm mt-1
                        ml-1 hover:bg-gray-700 focus:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
            </button>
            <!--/ Add new question -->

            <!-- Delete question -->
            <button type="button" @click="deleteQuestion"
                    class="flex items-center text-xs text-white mt-1 hover:border-red-500 border border-transparent px-1.5 py-1
                        ml-1 text-red-500 rounded-md ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete
            </button>
            <!--/ Delete question -->
        </div>
    </div>
    <!--/ Question index -->
    <div class="mb-3 grid gap-3 grid-cols-12">
        <!-- Question -->
        <div class=" col-span-9">
            <label class="block">
                <span> Question Text</span>
                <input type="text" v-model="model.question"
                    @change="dataChange"
                    class="block w-full sm:text-sm rounded-md border-gray-300 shadow-sm
                        focus:ring-indigo-500"
                />
            </label>
        </div>
        <!--/ Question -->

        <!-- Question Type -->
        <div class="mt-3 col-span-3">
            <label>
                <select v-model="model.type"
                    @change="typeChange"
                    class=""
                >
                    <option v-for="type in questionTypes" :key="type" :value="type">

                    </option>
                </select>
            </label>
        </div>
        <!--/ Question Type -->
    </div>

    <!-- Question Description -->

    <!--/ Question Description -->
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
    question: Object,
    index: Number,
})

const emit = defineEmits([
    "change", "addQuestion", "deleteQuestion"
]);

const questionTypes = [];

// Re-create the whole question data to avioid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

function addQuestion(){
}
function deleteQuestion(){
}
function dataChange(){
}
function typeChange(){
}

</script>

<style scoped>

</style>
