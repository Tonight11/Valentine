<script setup lang="ts">
import { ref } from 'vue';
import { moods } from '@/data/phrases';
import type { Mood } from '@/types';

const selectedMood = ref<Mood | null>(null);
const currentPhraseIndex = ref(0);

const selectMood = (mood: Mood) => {
  selectedMood.value = mood;
  currentPhraseIndex.value = 0;
};

const nextPhrase = () => {
  if (selectedMood.value) {
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % selectedMood.value.phrases.length;
  }
};

const randomPhrase = () => {
  if (selectedMood.value) {
    currentPhraseIndex.value = Math.floor(Math.random() * selectedMood.value.phrases.length);
  }
};
</script>

<template>
  <section id="moods" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        💭 Фразы для тебя
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Выбери своё настроение, и я скажу тебе что-то особенное! 💕
      </p>

      <!-- Mood Selection -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        <button
          v-for="mood in moods"
          :key="mood.id"
          @click="selectMood(mood)"
          :class="[
            'p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105',
            selectedMood?.id === mood.id
              ? 'ring-4 ring-red-400 scale-105'
              : 'hover:shadow-xl'
          ]"
          :style="{ backgroundColor: mood.color + '20', borderColor: mood.color }"
        >
          <div class="text-5xl mb-2">{{ mood.emoji }}</div>
          <div class="text-sm font-semibold text-gray-700">{{ mood.name }}</div>
        </button>
      </div>

      <!-- Phrase Display -->
      <div v-if="selectedMood" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div
            class="absolute top-0 left-0 right-0 h-2 transition-all duration-300"
            :style="{ backgroundColor: selectedMood.color }"
          ></div>
          
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">{{ selectedMood.emoji }}</div>
            <h3 class="text-2xl font-bold text-gray-800">{{ selectedMood.name }}</h3>
          </div>

          <div class="text-center mb-8 min-h-[120px] flex items-center justify-center">
            <p class="text-2xl md:text-3xl text-gray-700 leading-relaxed animate-fade-in">
              {{ selectedMood.phrases[currentPhraseIndex].text }}
            </p>
          </div>

          <div class="flex justify-center gap-4">
            <button
              @click="nextPhrase"
              class="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Следующая фраза ➡️
            </button>
            <button
              @click="randomPhrase"
              class="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Случайная 🎲
            </button>
          </div>

          <div class="text-center mt-6 text-sm text-gray-500">
            {{ currentPhraseIndex + 1 }} из {{ selectedMood.phrases.length }}
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 text-lg">
        Выбери настроение выше, чтобы увидеть фразу! 👆
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
