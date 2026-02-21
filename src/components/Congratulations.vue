<script setup lang="ts">
import { ref } from "vue";
import ScratchToReveal from '@/components/ScratchToReveal.vue'
import { Flower2, Sun } from 'lucide-vue-next';

const images = ref([
    "/like1.jpg",
    "/like2.jpg",
    "/like3.jpg",
    "/like4.jpg"
]);
</script>

<template>
    <div class="flex flex-col items-center text-center animate-fade-in py-10">
        <div class="flex items-center gap-3 mb-4">
            <Flower2 class="w-10 h-10 text-emerald-500 animate-bounce" />
            <h2 class="text-4xl font-bold text-emerald-600">С весной, любимая!</h2>
        </div>

        <p class="text-xl mt-2 text-gray-700 max-w-2xl mx-auto font-medium">
            Ты отлично знаешь меня! Пусть эта весна принесет нам много радости и тепла!
        </p>
        <p class="text-lg mt-4 text-emerald-500 font-bold uppercase tracking-wider">
            Наши весенние воспоминания:
        </p>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScratchToReveal v-for="src in images" :key="src" :width="280" :height="280" :min-scratch-percentage="50"
                class="mx-auto flex items-center justify-center overflow-hidden rounded-3xl border-4 border-emerald-50 bg-gray-100 shadow-xl"
                :gradient-colors="['#10b981', '#facc15', '#6ee7b7']">
                <img :src="src" class="w-full h-full rounded-lg shadow-md object-cover" />
            </ScratchToReveal>
        </div>

        <div class="mt-12 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100 flex flex-col items-center gap-3">
            <div class="p-3 bg-white rounded-full shadow-sm">
                <Sun class="w-8 h-8 text-yellow-500 animate-spin-slow" />
            </div>
            <p class="text-xl text-gray-700 font-bold">
                Для особенного подарка напиши мне "Весна пришла"!
            </p>
        </div>
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

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}
</style>
