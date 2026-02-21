<script setup lang="ts">
import { achievements } from '@/data/achievements';
import IconRenderer from '@/components/ui/IconRenderer.vue';
import { Trophy, Check, Lock, Star } from 'lucide-vue-next';

const sortedAchievements = [...achievements].sort((a, b) =>
  new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
);
</script>

<template>
  <section id="achievements" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Trophy class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Наши достижения
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Каждый момент вместе расцветает новой победой!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="achievement in sortedAchievements" :key="achievement.id" :class="[
          'rounded-3xl shadow-lg p-8 transition-all duration-300 transform hover:scale-105 border-2',
          achievement.unlocked
            ? 'bg-white border-emerald-400'
            : 'bg-gray-50 border-gray-200 opacity-60'
        ]">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div :class="[
                'w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner',
                achievement.unlocked ? 'bg-emerald-50' : 'bg-gray-100'
              ]">
                <IconRenderer v-if="achievement.icon" :name="achievement.icon" :size="40"
                  :color="achievement.unlocked ? '#10b981' : '#9ca3af'" />
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ achievement.title }}
            </h3>
            <p class="text-sm text-gray-700 mb-6">
              {{ achievement.description }}
            </p>
            <div :class="[
              'inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider',
              achievement.unlocked
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                : 'bg-gray-400 text-white'
            ]">
              <component :is="achievement.unlocked ? Check : Lock" class="w-4 h-4" />
              {{ achievement.unlocked ? 'Разблокировано' : 'Заблокировано' }}
            </div>
            <p class="text-xs text-gray-500 mt-4 font-medium italic">
              {{ achievement.date ? new Date(achievement.date).toLocaleDateString('ru-RU', {
                year: 'numeric', month:
                  'long', day: 'numeric'
              }) : '' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="inline-block bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
          <div class="flex items-center justify-center gap-2 mb-2">
            <Star class="w-8 h-8 text-emerald-500 fill-emerald-500" />
            <p class="text-2xl font-bold text-emerald-600">
              {{achievements.filter(a => a.unlocked).length}} / {{ achievements.length }} наград собрано!
            </p>
          </div>
          <p class="text-gray-600">
            Продолжаем создавать новые воспоминания вместе!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}
</style>
