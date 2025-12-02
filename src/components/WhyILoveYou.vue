<script setup lang="ts">
import { ref } from 'vue';
import { reasons } from '@/data/reasons';

const visibleReasons = ref<number[]>([]);

const revealReason = (id: number) => {
  if (!visibleReasons.value.includes(id)) {
    visibleReasons.value.push(id);
  }
};

const revealAll = () => {
  visibleReasons.value = reasons.map(r => r.id);
};

const hideAll = () => {
  visibleReasons.value = [];
};
</script>

<template>
  <section id="reasons" class="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        ❤️ Почему я тебя люблю
      </h2>
      <p class="text-center text-gray-600 mb-8 text-lg">
        Причин бесконечно много, но вот некоторые из них! 💕
      </p>

      <div class="flex justify-center gap-4 mb-12">
        <button
          @click="revealAll"
          class="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Показать все 💖
        </button>
        <button
          @click="hideAll"
          class="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Скрыть все
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="reason in reasons"
          :key="reason.id"
          @click="revealReason(reason.id)"
          :class="[
            'relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 cursor-pointer',
            visibleReasons.includes(reason.id)
              ? 'bg-gradient-to-br from-red-100 to-pink-100'
              : 'bg-gradient-to-br from-gray-200 to-gray-300'
          ]"
        >
          <div class="p-6 min-h-[150px] flex flex-col items-center justify-center text-center">
            <div
              v-if="!visibleReasons.includes(reason.id)"
              class="text-6xl mb-2"
            >
              ❓
            </div>
            <div
              v-else
              class="animate-fade-in"
            >
              <div class="text-5xl mb-3">{{ reason.icon }}</div>
              <p class="text-lg font-medium text-gray-800">{{ reason.text }}</p>
            </div>
          </div>

          <div
            v-if="!visibleReasons.includes(reason.id)"
            class="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]"
          >
            <p class="text-sm text-gray-600 font-medium">Нажми, чтобы открыть! 💕</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
