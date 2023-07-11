<template>
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full">
        <div class="container mx-auto">
            <nav class="p-4 flex items-center justify-between">
                <div class="text-lg font-medium">
                    <Link :href="route('image.create')">Upload</Link>&nbsp;
                </div>
                <div class="text-lg font-medium">
                    <Link :href="route('image.index')" class="text-xl text-gray-50 dark:text-gray-50 font-bold text-center">Upload Image to Discord Bot</Link>
                </div>
                <div class="text-lg font-medium">
                    <Link :href="route('image.index')">Add to Server</Link>
                </div>
            </nav>
        </div>
    </header>

    <main class="container mx-auto p-4">
        <div v-if="flashSuccess" class="mb-4 border rounded-md shadow-sm border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900 text-gray-50 p-2">
            {{ flashSuccess }}
        </div>
        <slot>Default</slot>
    </main>
    
</template>

<script setup>
    import { usePage, Link } from '@inertiajs/vue3'
    import { computed } from 'vue';

    const flashSuccess = computed(() => usePage().props.flash.success);
</script>