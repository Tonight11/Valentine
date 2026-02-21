<script setup lang="ts">
import { photos } from '@/data/photos';
import ScratchToReveal from '@/components/ScratchToReveal.vue';
import { Camera, Sparkles } from 'lucide-vue-next';
</script>

<template>
  <section id="gallery" class="min-h-screen py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Camera class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Фотографии нашей любви
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-16 text-lg flex items-center justify-center gap-2">
        Каждый момент расцветает в моем сердце! Сотри, чтобы увидеть!
        <Sparkles class="w-6 h-6 text-yellow-500" />
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="photo in photos" :key="photo.id" class="relative group">
          <ScratchToReveal :width="320" :height="400" :min-scratch-percentage="40"
            class="mx-auto flex items-center justify-center overflow-hidden rounded-[2rem] border-4 border-emerald-50 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
            :gradient-colors="['#10b981', '#facc15', '#6ee7b7']">
            <img :src="photo.src" alt="Photo" class="w-full h-full object-cover" />
          </ScratchToReveal>
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
