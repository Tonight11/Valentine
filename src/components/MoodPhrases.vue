<script setup lang="ts">
import { ref } from 'vue';
import { moods } from '@/data/phrases';
import type { Mood } from '@/types';
import IconRenderer from '@/components/ui/IconRenderer.vue';
import {
  MessageCircle,
  ChevronRight,
  Dices,
  Flower2
} from 'lucide-vue-next';

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
  <section id="moods" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <MessageCircle class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Фразы для тебя
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Выбери своё настроение, и я скажу тебе что-то особенное!
      </p>

      <!-- Mood Selection -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        <button v-for="mood in moods" :key="mood.id" @click="selectMood(mood)" :class="[
          'p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center',
          selectedMood?.id === mood.id
            ? 'ring-4 ring-emerald-400 scale-105'
            : 'hover:shadow-xl'
        ]"
          :style="{ backgroundColor: mood.id === selectedMood?.id ? mood.color : mood.color + '20', borderColor: mood.color }">
          <IconRenderer :name="mood.emoji" :size="48" :color="selectedMood?.id === mood.id ? 'white' : mood.color" />
          <div class="text-sm font-bold mt-4" :class="selectedMood?.id === mood.id ? 'text-white' : 'text-gray-700'">{{
            mood.name }}</div>
        </button>
      </div>

      <!-- Phrase Display -->
      <div v-if="selectedMood" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-2 transition-all duration-300"
            :style="{ backgroundColor: selectedMood.color }"></div>

          <div class="text-center mb-8 flex flex-col items-center">
            <div class="p-6 rounded-full mb-4" :style="{ backgroundColor: selectedMood.color + '20' }">
              <IconRenderer :name="selectedMood.emoji" :size="64" :color="selectedMood.color" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800">{{ selectedMood.name }}</h3>
          </div>

          <div class="text-center mb-8 min-h-[120px] flex items-center justify-center">
            <p class="text-2xl md:text-3xl text-gray-700 leading-relaxed animate-fade-in font-medium italic">
              "{{ selectedMood.phrases[currentPhraseIndex].text }}"
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <button @click="nextPhrase"
              class="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
              Следующая фраза
              <ChevronRight class="w-5 h-5" />
            </button>
            <button @click="randomPhrase"
              class="px-8 py-3 bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
              Случайная
              <Dices class="w-5 h-5" />
            </button>
          </div>

          <div class="text-center mt-6 text-sm text-gray-500 font-medium">
            {{ currentPhraseIndex + 1 }} из {{ selectedMood.phrases.length }}
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 text-lg flex flex-col items-center gap-4">
        <Flower2 class="w-12 h-12 text-emerald-200 animate-pulse" />
        Выбери настроение выше, чтобы увидеть фразу!
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
