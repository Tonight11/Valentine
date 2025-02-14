<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useLocalStorage } from "@vueuse/core";
import Congratulations from "./Congratulations.vue";
import { Button } from "@/components/ui/button";

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
        alert("Ответы неверны! Попробуйте снова ❤️");
    }
};

onMounted(() => {
    if (isCompleted.value) {
        document.body.classList.add("bg-pink-200");
    }
});
</script>

<template>
    <div v-if="!isCompleted" class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 class="text-2xl font-bold mb-4 text-red-500">❤️ Привет Жумасия | Адина ❤️</h2>
        <h2 class="text-2xl font-bold mb-4 text-red-500">❤️ Пройди квиз на 14 февраля ❤️</h2>
        <div v-for="q in questions" :key="q.id" class="mb-4">
            <p class="text-lg font-semibold">{{ q.question }}</p>
            <div class="flex flex-wrap justify-center gap-2 mt-2">
                <button v-for="option in q.options" :key="option" class="px-4 py-2 rounded-lg border transition-all"
                    :class="answers[q.id] === option ? 'bg-red-400 text-white' : 'border-red-400 text-red-400'"
                    @click="answers[q.id] = option">
                    {{ option }}
                </button>
            </div>
        </div>
        <Button class="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg" @click="submitQuiz">
            Отправить ❤️
        </Button>

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

body.bg-pink-200 {
    background-color: #ffe4e6;
}
</style>
