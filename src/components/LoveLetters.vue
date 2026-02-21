<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { loveLetters } from '@/data/letters';
import { Mail, BookOpen, X, Heart } from 'lucide-vue-next';

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
  <section id="letters" class="min-h-screen py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Mail class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Письма любви для тебя
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Каждое письмо расцветает нежностью!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="letter in loveLetters" :key="letter.id" @click="openLetter(letter.id)"
          class="relative cursor-pointer group">
          <!-- Envelope -->
          <div class="relative w-full h-64 perspective-1000">
            <div :class="[
              'w-full h-full transition-all duration-700 transform-style-3d',
              isOpened(letter.id) ? 'rotate-y-180' : 'hover:scale-105'
            ]">
              <!-- Front of envelope -->
              <div class="absolute inset-0 backface-hidden">
                <div
                  class="w-full h-full bg-white rounded-3xl shadow-xl border-4 border-emerald-100 flex flex-col items-center justify-center p-6 transition-colors group-hover:border-emerald-300">
                  <div
                    class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Mail class="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 class="text-xl font-bold text-gray-800 text-center mb-2">{{ letter.title }}</h3>
                  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ new
                    Date(letter.date).toLocaleDateString('ru-RU', {
                      year:
                        'numeric', month: 'long', day: 'numeric'
                    }) }}</p>
                  <div
                    class="mt-6 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold border border-emerald-100">
                    {{ isOpened(letter.id) ? 'Прочитано' : 'Открыть письмо' }}
                  </div>
                </div>
              </div>

              <!-- Back of envelope (opened state) -->
              <div class="absolute inset-0 backface-hidden rotate-y-180">
                <div
                  class="w-full h-full bg-gradient-to-br from-emerald-500 to-lime-500 rounded-3xl shadow-xl flex items-center justify-center p-4">
                  <div class="text-center text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen class="w-8 h-8 text-white" />
                    </div>
                    <p class="text-lg font-bold">Письмо открыто!</p>
                    <p class="text-xs opacity-80 mt-1">Нажми снова, чтобы прочитать</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Letter Modal -->
    <div v-if="selectedLetter !== null" @click="closeLetter"
      class="fixed inset-0 bg-emerald-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div @click.stop
        class="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative max-h-[90vh] overflow-y-auto border border-emerald-100">
        <button @click="closeLetter"
          class="absolute top-6 right-6 p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-all">
          <X class="w-6 h-6" />
        </button>

        <div class="mb-10 text-center">
          <div
            class="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Heart class="w-3 h-3 fill-emerald-500" />
            Для моей любимой
          </div>
          <h3 class="text-4xl font-bold text-gray-800 mb-2">
            {{loveLetters.find(l => l.id === selectedLetter)?.title}}
          </h3>
          <p class="text-sm font-medium text-gray-400">
            {{new Date(loveLetters.find(l => l.id === selectedLetter)?.date || '').toLocaleDateString('ru-RU', {
              year:
                'numeric', month: 'long', day: 'numeric'
            })}}
          </p>
        </div>

        <div class="bg-emerald-50/30 p-8 rounded-3xl border border-emerald-100/50">
          <p class="text-gray-700 leading-relaxed whitespace-pre-line text-lg italic serif">
            "{{loveLetters.find(l => l.id === selectedLetter)?.content}}"
          </p>
        </div>

        <div class="mt-10 text-center">
          <div class="inline-flex items-center gap-2 text-emerald-600 font-bold text-xl">
            С любовью, всегда твой
            <Heart class="w-6 h-6 fill-emerald-500" />
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
