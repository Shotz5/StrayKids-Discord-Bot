<template>
    <div class="text-center justify-center">
        <form v-on:submit.prevent="submit">
            <div>
                <input type="file" v-on:change="updateFileList" multiple />
                <button>Submit</button>
            </div>
            <div v-if="form.errors" v-for="errors in form.errors" class="input-error">
                {{ errors }}
            </div>
        </form>
    </div>
</template>

<script setup>
    import { useForm } from '@inertiajs/vue3'

    const form = useForm({
        images: null,
    });

    const updateFileList = (e) => form.images = e.target.files;

    const submit = () => form.post(route('image.store'), form);

</script>