<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { loveLetters } from '@/data/letters';

const openedLetters = useLocalStorage<number[]>('openedLetters', []);
const selectedLetter = ref<number | null>(null);

const openLetter = (id: number) => {
  selectedLetter.value = id;
  if (!openedLetters.value.includes(id)) {
    openedLetters.value.push(id);
  }
};

const closeLetter = () => {
  selectedLetter.value = null;
};

const isOpened = (id: number) => openedLetters.value.includes(id);
</script>

<template>
  <section id="letters" class="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        💌 Письма любви для тебя
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Каждое письмо написано от всего сердца! 💕
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="letter in loveLetters"
          :key="letter.id"
          @click="openLetter(letter.id)"
          class="relative cursor-pointer group"
        >
          <!-- Envelope -->
          <div class="relative w-full h-64 perspective-1000">
            <div
              :class="[
                'w-full h-full transition-all duration-500 transform-style-3d',
                isOpened(letter.id) ? 'rotate-y-180' : 'hover:scale-105'
              ]"
            >
              <!-- Front of envelope -->
              <div class="absolute inset-0 backface-hidden">
                <div class="w-full h-full bg-gradient-to-br from-red-200 to-pink-200 rounded-lg shadow-xl border-4 border-red-300 flex flex-col items-center justify-center p-6">
                  <div class="text-6xl mb-4">💌</div>
                  <h3 class="text-xl font-bold text-gray-800 text-center mb-2">{{ letter.title }}</h3>
                  <p class="text-sm text-gray-600">{{ new Date(letter.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                  <div class="mt-4 px-4 py-2 bg-white/50 rounded-full text-sm font-medium">
                    {{ isOpened(letter.id) ? 'Прочитано ✓' : 'Нажми, чтобы открыть' }}
                  </div>
                </div>
              </div>

              <!-- Back of envelope (opened state) -->
              <div class="absolute inset-0 backface-hidden rotate-y-180">
                <div class="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg shadow-xl border-4 border-yellow-300 flex items-center justify-center p-4">
                  <div class="text-center">
                    <div class="text-4xl mb-2">📖</div>
                    <p class="text-sm font-medium text-gray-700">Письмо открыто!</p>
                    <p class="text-xs text-gray-600 mt-1">Нажми снова, чтобы прочитать</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Letter Modal -->
    <div
      v-if="selectedLetter !== null"
      @click="closeLetter"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <div @click.stop class="max-w-2xl w-full bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl p-8 md:p-12 relative max-h-[90vh] overflow-y-auto">
        <button
          @click="closeLetter"
          class="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-3xl transition-colors"
        >
          ✕
        </button>

        <div class="mb-6">
          <h3 class="text-3xl font-bold text-red-600 mb-2">
            {{ loveLetters.find(l => l.id === selectedLetter)?.title }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ new Date(loveLetters.find(l => l.id === selectedLetter)?.date || '').toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <div class="prose prose-lg max-w-none">
          <p class="text-gray-800 leading-relaxed whitespace-pre-line">
            {{ loveLetters.find(l => l.id === selectedLetter)?.content }}
          </p>
        </div>

        <div class="mt-8 text-center">
          <div class="inline-block px-6 py-3 bg-red-500 text-white rounded-full">
            С любовью, всегда твой ❤️
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
