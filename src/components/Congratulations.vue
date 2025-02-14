<script setup lang="ts">
import { ref } from "vue";
import ScratchToReveal from '@/components/ScratchToReveal.vue'

const images = ref([
    "/like1.jpg",
    "/like2.jpg",
    "/like3.jpg",
    "/like4.jpg"
]);
</script>

<template>
    <div class="flex flex-col items-center text-center animate-fade-in">
        <h2 class="text-3xl font-bold text-red-500 mt-10">Поздравляем! ❤️</h2>
        <p class="text-lg mt-2 text-gray-600">Ты прошёл квиз и доказал, что немного знаешь меня! Вот первый подарок</p>
        <p class="text-lg mt-2 text-gray-600">Мои любимые фотографии тебя!!</p>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ScratchToReveal v-for="src in images" :key="src" :width="250" :height="250" :min-scratch-percentage="50"
                class="mx-auto flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
                :gradient-colors="['#A97CF8', '#F38CB8', '#FDCC92']" @complete="handleComplete">
                <img :src="src" class="w-full h-full rounded-lg shadow-md object-cover" />
            </ScratchToReveal>
        </div>
        <p class="text-lg mt-2 text-gray-600">Для второго подарка отправь мне скрин, что ты прошла</p>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out;
}
</style>
