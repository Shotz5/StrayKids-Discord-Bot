<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Image v-for="image in images" :key="image.id" :image="image" />
    </div>
</template>

<script setup>
    import Image from '@/Pages/Index/Components/Image.vue'
    defineProps({
        images: Array,
    })
</script>