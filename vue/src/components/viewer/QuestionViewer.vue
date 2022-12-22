<template>
    <fieldset class="mb-4">
        <div>
            <legend class="text-base font-medium text-gray-900">
                {{ index + 1 }}. {{ question.question }}
            </legend>

        </div>
        <div class="mt-3 ">
            <div v-if="question.type === 'select'">
                <select
                    @change="emits('update:modelValue', $event.target.value)"
                    :value="modelValue"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md
                        showdow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                        sm:text-sm"
                >
                    <option value="">Please Select</option>
                    <option v-for="option in question.data.options"
                        :key="option.uuid"
                        :value="option.text"
                        >
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <div v-else-if="question.type === 'radio'">
                <div v-for="option in question.data.options"
                    :key="option.uuid"
                     class=""
                >
<!--                    :id="option.uuid"-->
                    <label class="ml-3 block text-sm font-medium text-gray-700">
                        <input
                            :name="'question' + question.id"
                            @change="emits('update:modelValue', $event.target.value)"
                            :value="option.text"
                            type="radio"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <span class="ml-2">{{option.text}}</span>
                    </label>
                </div>
            </div>
            <div v-else-if="question.type === 'checkbox'">
<!--                <pre>{{model}}</pre>-->
                <div v-for="option in question.data.options"
                     :key="option.uuid"
                     class=""
                >
                    <label class="ml-3 block text-sm font-medium text-gray-700">
                        <input
                            :id="option.uuid"
                            v-model="model[option.text]"
                            @change="onCheckboxChange"
                            :value="option.text"
                            type="checkbox"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span class="ml-2">{{option.text}}</span>
                    </label>
                </div>
            </div>
            <div v-else-if="question.type === 'text'">
                <input
                    :value="modelValue"
                    @change="emits('update:modelValue', $event.target.value)"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md border
                        showdow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                        sm:text-sm"
                >
            </div>
            <div v-else-if="question.type === 'textarea'">
                <textarea
                    :value="modelValue"
                    @change="emits('update:modelValue', $event.target.value)"
                    class="mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md border
                        showdow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                        sm:text-sm"
                />
            </div>
        </div>
    </fieldset>

    <hr class="mb-4">
</template>

<script setup>
import {ref} from "vue";
const {question, index, modelValue} = defineProps({
    question: Object,
    index: Number,
    modelValue: [String, Array],
});
const emits = defineEmits(['update:modelValue'])

let model;
if (question.type === 'checkbox'){
    model = ref({})
}

function onCheckboxChange() {
    const selectedOptions = [];
    for (let key in model.value){
        if (model.value[key]){
            selectedOptions.push(key);
        }
    }
    emits("update:modelValue", selectedOptions);
}
</script>

<style></style>
