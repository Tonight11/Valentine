<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useLocalStorage } from "@vueuse/core";
import Congratulations from "./Congratulations.vue";
import { HelpCircle, CheckCircle, Send, Flower2 } from 'lucide-vue-next';

const questions = ref([
    {
        id: 1,
        question: "Когда у меня день рождения?",
        options: ["21 мая", "20 апреля", "14 марта", "21 апреля"],
        correct: "21 апреля"
    },
    {
        id: 2,
        question: "Кто мой любимый футболист?",
        options: ["Месси", "Роналду", "Неймар", "Гризман"],
        correct: "Месси"
    },
    {
        id: 3,
        question: "Мой любимый главный герой?",
        options: ["Наруто", "Луффи", "Арису", "Соул"],
        correct: "Луффи"
    },
    {
        id: 4,
        question: "Какой цветок является символом любви?",
        options: ["Лилия", "Роза", "Тюльпан", "Орхидея"],
        correct: "Роза"
    }
]);

const answers = ref<Record<number, string>>({});
const isCompleted = useLocalStorage("quizCompleted", false);

const isCorrect = computed(() => {
    return questions.value.every(q => answers.value[q.id] === q.correct);
});

const submitQuiz = async () => {
    if (isCorrect.value) {
        isCompleted.value = true;

        await nextTick();
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        alert("Ответы неверны! Попробуйте снова");
    }
};

onMounted(() => {
    if (isCompleted.value) {
        document.body.classList.add("bg-emerald-50");
    }
});
</script>

<template>
    <div v-if="!isCompleted"
        class="max-w-2xl mx-auto p-10 bg-white rounded-3xl shadow-2xl text-center border border-emerald-100">
        <div class="flex items-center justify-center gap-3 mb-6">
            <Flower2 class="w-8 h-8 text-emerald-500" />
            <h2 class="text-3xl font-bold text-emerald-600">Весенний квиз</h2>
        </div>

        <p class="text-gray-600 mb-10 text-lg">Проверь, как хорошо ты меня знаешь этой весной!</p>

        <div class="space-y-8">
            <div v-for="q in questions" :key="q.id" class="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div class="flex items-center justify-center gap-2 mb-4">
                    <HelpCircle class="w-5 h-5 text-emerald-500" />
                    <p class="text-lg font-bold text-gray-800">{{ q.question }}</p>
                </div>
                <div class="flex flex-wrap justify-center gap-3">
                    <button v-for="option in q.options" :key="option"
                        class="px-6 py-2 rounded-full border-2 transition-all font-medium flex items-center gap-2"
                        :class="answers[q.id] === option
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                            : 'bg-white border-emerald-200 text-emerald-600 hover:border-emerald-400'"
                        @click="answers[q.id] = option">
                        <CheckCircle v-if="answers[q.id] === option" class="w-4 h-4" />
                        {{ option }}
                    </button>
                </div>
            </div>
        </div>

        <button
            class="mt-10 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            @click="submitQuiz">
            <Send class="w-5 h-5" />
            Отправить ответы
        </button>
    </div>

    <Congratulations v-else />
</template>

<style scoped>
button {
    transition: transform 0.2s ease;
}

button:active {
    transform: scale(0.95);
}

body.bg-emerald-200 {
    background-color: #ecfdf5;
}
</style>
