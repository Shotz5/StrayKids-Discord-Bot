<template>
    <Box>
        <div class="overflow-hidden">
            {{ image.name }}
        </div>
    </Box>
</template>

<script setup>
    import Box from '@/Components/UI/Box.vue';

    const props = defineProps({
        image: Object
    });
</script>