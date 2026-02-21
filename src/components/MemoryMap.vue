<script setup lang="ts">
import { places } from '@/data/places';
import { MapPin, Calendar } from 'lucide-vue-next';
</script>

<template>
  <section id="places" class="min-h-screen py-20 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <MapPin class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Наши особенные места
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-16 text-lg">
        Места, где нашей весной расцвели чувства!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div v-for="place in places" :key="place.id"
          class="bg-white rounded-[2.5rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-emerald-50 group">
          <div class="relative h-80 overflow-hidden">
            <img :src="place.image" :alt="place.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div
              class="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-emerald-600 shadow-lg flex items-center gap-2">
              <Calendar class="w-4 h-4" />
              {{ new Date(place.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
          <div class="p-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="p-2 bg-emerald-50 rounded-lg">
                <MapPin class="w-6 h-6 text-emerald-500" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800">{{ place.name }}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed text-lg">{{ place.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
