<script setup lang="ts">
import { ref } from 'vue';
import { photos } from '@/data/photos';
import ScratchToReveal from '@/components/ScratchToReveal.vue';
</script>

<template>
  <section id="gallery" class="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        📸 Мои любимые фотографии тебя
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Каждая из них особенная для меня! Сотри, чтобы увидеть! 💕
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="relative"
        >
          <ScratchToReveal
            :width="350"
            :height="350"
            :min-scratch-percentage="50"
            class="mx-auto flex items-center justify-center overflow-hidden rounded-2xl border-2 shadow-lg"
            :gradient-colors="['#A97CF8', '#F38CB8', '#FDCC92']"
          >
            <img
              :src="photo.src"
              :alt="photo.caption"
              class="w-full h-full object-cover"
            />
          </ScratchToReveal>
          <div class="mt-3 text-center">
            <p class="text-sm font-medium text-gray-700">{{ photo.caption }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ photo.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
