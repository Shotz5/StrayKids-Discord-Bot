<template>
    <div class="text-center justify-center">
        <form v-on:submit.prevent="submit">
            <div>
                <input type="file" name="images" v-on:change="updateFileList" accept="image/*" multiple />
                <button>Submit</button>
            </div>
            <div v-if="form.errors" v-for="errors in form.errors" class="input-error">
                {{ errors }}
            </div>
        </form>
        <progress v-if="form.progress" :value="form.progress.percentage" max="100">
            {{ form.progress.percentage }}%
        </progress>
    </div>
</template>

<script setup>
    import { useForm } from '@inertiajs/vue3'

    const form = useForm({
        images: null,
    });

    const updateFileList = (e) => form.images = e.target.files;

    const submit = () => form.post(route('image.store'), {
        data: form,
        onSuccess: () => document.getElementsByName('images')[0].value = "",
    });

</script>