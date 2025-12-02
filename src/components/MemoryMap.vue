<script setup lang="ts">
import { places } from '@/data/places';
</script>

<template>
  <section id="places" class="min-h-screen py-20 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        📍 Наши особенные места
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Места, где мы создали незабываемые воспоминания! 💕
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="place in places"
          :key="place.id"
          class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              :src="place.image"
              :alt="place.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              {{ new Date(place.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-red-600 mb-3">{{ place.name }}</h3>
            <p class="text-gray-700 leading-relaxed">{{ place.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
