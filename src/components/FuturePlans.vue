<script setup lang="ts">
import { futurePlans } from '@/data/plans';

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'from-red-100 to-pink-100 border-red-300';
    case 'medium': return 'from-yellow-100 to-orange-100 border-yellow-300';
    case 'low': return 'from-blue-100 to-cyan-100 border-blue-300';
    default: return 'from-gray-100 to-gray-200 border-gray-300';
  }
};
</script>

<template>
  <section id="plans" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        🌟 Наше будущее вместе
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Мечты и планы, которые мы воплотим вместе! 💕
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="plan in futurePlans"
          :key="plan.id"
          :class="[
            'rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br',
            getPriorityColor(plan.priority)
          ]"
        >
          <div class="text-5xl mb-4 text-center">{{ plan.icon }}</div>
          <h3 class="text-xl font-bold text-gray-800 mb-3 text-center">{{ plan.title }}</h3>
          <p class="text-gray-700 leading-relaxed text-center">{{ plan.description }}</p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <div class="inline-block bg-white rounded-2xl shadow-lg p-6">
          <p class="text-2xl font-bold text-red-500 mb-2">
            Вместе мы можем всё! 💪💕
          </p>
          <p class="text-gray-600">
            Я верю в наше будущее и с нетерпением жду каждого момента с тобой!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
