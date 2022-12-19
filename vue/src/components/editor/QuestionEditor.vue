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
                     class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete
            </button>
            <!--/ Delete question -->
        </div>
    </div>
    <!--/ Question index -->

    <div class="grid gap-3 grid-cols-12">
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
        <div class=" col-span-3">
            <label>
                <span>Question Type</span>
                <select v-model="model.type"
                    @change="typeChange"
                    class=" block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm
                         sm:text-sm focus:ring-indigo-500"
                >
                    <option v-for="type in questionTypes" :key="type" :value="type">
                        {{ upperCaseFirst(type) }}
                    </option>
                </select>
            </label>
        </div>
        <!--/ Question Type -->
    </div>

    <!-- Question Description -->
    <div class="mt-1 col-span-9">
        <label class="block">
            <span>Description</span>
            <textarea v-model="model.description"
                @change="dataChange"
                class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm
                     sm:text-sm focus:ring-indigo-500"
            />
        </label>
    </div>
    <!--/ Question Description -->

    <!-- Data -->
    <div>
        <div v-if="shouldHaveOptions()"
            class="mt-2"
        >
            <h4 class="flex font-semibold items-center text-sm justify-between">
                Options

                <!-- Add new option -->
                <button @click="addOption"
                    class="flex items-center text-xs py-1 px-2 bg-gray-600 text-white rounded-sm hover:bg-gray-700 focus:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add option
                </button>
                <!--/ Add new option -->
            </h4>

            <div v-if="!model.data.options?.length"
                class="text-sm text-center text-gray-500"
            >
                You don't have any options defined
            </div>
            <div v-else class="mt-1.5">
                <!-- Option list -->
                <div v-for="(option, index) in model.data.options"
                    :key="option.uuid"
                    class="flex items-center mb-1"
                    >
                    <span class="w-6 text-sm">{{ index + 1 }}.</span>
                    <input
                        type="text"
                        v-model="option.text"
                        @change="dataChange"
                        class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300
                                focus:border-indigo-600"
                    />
                    <button
                        @click="removeOption(option)"
                        class="flex items-center text-red-500 hover:border-red-200 border border-transparent
                        w-6 h-6 transition-colors ml-1 px-0.5 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                             class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                <!--/ Option list -->
            </div>
        </div>
    </div>
    <!--/ Data -->

    <hr class="my-4">
</template>

<script setup>
import {v4 as uuidv4} from "uuid"
import {ref} from "vue";
import {computed} from "vue";
import store from "../../store/index.js";

const props = defineProps({
    question: Object,
    index: Number,
})

const emit = defineEmits([
    "change", "addQuestion", "deleteQuestion"
]);

const questionTypes = computed( () => store.state.questionTypes );

// Re-create the whole question data to avioid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

function upperCaseFirst(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
}
function shouldHaveOptions(){
    return ["select", "radio", "checkbox"].includes(model.value.type);
}

function getOptions(){
    return model.value.data.options;
}
function setOptions(options){
    return model.value.data.options = options;
}
function addOption(){
    setOptions([
        ...getOptions(),
        { uuid: uuidv4(), text: "", }
    ]);
    dataChange();
}
function removeOption(op){
    setOptions(getOptions().filter(opt => opt !== op))
    dataChange();
}

function typeChange(){
    if (shouldHaveOptions()){
        setOptions(getOptions() || [])
    }
    dataChange();
}

function dataChange(){
    //const data = model.value;
    const data = JSON.parse(JSON.stringify(model.value));
    if (!shouldHaveOptions()){
        delete data.data.options;
    }

    emit("change", data);
}

function addQuestion(){
    emit("addQuestion", props.index + 1);
}

function deleteQuestion(){
    emit("deleteQuestion", props.question);
}

</script>

<style scoped>

</style>
