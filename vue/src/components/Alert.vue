<template>
    <div class="relative px-5 py-3 bg-red-500 rounded-md text-white mb-1">
        <div>
            <slot></slot>
        </div>
        <span @click="$emit('closeAlert')"
          class="absolute text-white right-1 top-1 flex items-center justify-center h-8 w-8 cursor-pointer rounded-full transition-colors hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
        </span>
    </div>
</template>

<script setup>
const emit = defineEmits( ['closeAlert']);

function closeAlert() {
    //emit('closeAlert', 'YES!');
}

</script>

<style scoped>

</style>
