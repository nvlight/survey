<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <slot name="header"></slot>
        </div>
    </header>
    <main class="bg-gray-100 min-h-screen">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-6 sm:px-0">
                <slot></slot>
            </div>
            <!-- /End replace -->
        </div>
    </main>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: 'Default Title',
    }
});

</script>
