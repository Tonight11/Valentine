<script setup lang="ts">
import { futurePlans } from '@/data/plans';
import IconRenderer from '@/components/ui/IconRenderer.vue';
import { Star, Heart } from 'lucide-vue-next';

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'from-emerald-100 to-lime-100 border-emerald-300';
    case 'medium': return 'from-yellow-100 to-emerald-50 border-emerald-200';
    case 'low': return 'from-blue-100 to-cyan-100 border-blue-300';
    default: return 'from-gray-100 to-gray-200 border-gray-300';
  }
};
</script>

<template>
  <section id="plans" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Star class="w-10 h-10 text-emerald-500 fill-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Наше будущее вместе
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Мечты и планы, которые мы воплотим этой весной и всегда!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="plan in futurePlans" :key="plan.id" :class="[
          'rounded-2xl shadow-lg p-8 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br',
          getPriorityColor(plan.priority)
        ]">
          <div class="mb-6 flex justify-center">
            <div class="p-4 bg-white/50 rounded-2xl shadow-sm backdrop-blur-sm">
              <IconRenderer v-if="plan.icon" :name="plan.icon" :size="48" color="#10b981" />
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3 text-center">{{ plan.title }}</h3>
          <p class="text-gray-700 leading-relaxed text-center">{{ plan.description }}</p>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="inline-block bg-white rounded-3xl shadow-xl p-8 max-w-2xl border border-emerald-100">
          <div class="flex items-center justify-center gap-2 mb-3">
            <Heart class="w-8 h-8 text-emerald-500 fill-emerald-500" />
            <p class="text-2xl font-bold text-emerald-600">
              Вместе мы можем всё!
            </p>
          </div>
          <p class="text-lg text-gray-600">
            Я верю в наше будущее и с нетерпением жду каждого момента с тобой!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
