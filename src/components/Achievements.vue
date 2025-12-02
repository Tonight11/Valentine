<script setup lang="ts">
import { ref } from 'vue';
import { achievements } from '@/data/achievements';

const sortedAchievements = [...achievements].sort((a, b) => 
  new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
);
</script>

<template>
  <section id="achievements" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-pink-50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        🏆 Наши достижения
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Каждый момент вместе - это победа! 💕
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="achievement in sortedAchievements"
          :key="achievement.id"
          :class="[
            'rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105',
            achievement.unlocked
              ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
              : 'bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 opacity-60'
          ]"
        >
          <div class="text-center">
            <div
              :class="[
                'text-6xl mb-4',
                !achievement.unlocked && 'grayscale opacity-50'
              ]"
            >
              {{ achievement.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ achievement.title }}
            </h3>
            <p class="text-sm text-gray-700 mb-3">
              {{ achievement.description }}
            </p>
            <div
              :class="[
                'inline-block px-4 py-1 rounded-full text-xs font-medium',
                achievement.unlocked
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
              ]"
            >
              {{ achievement.unlocked ? '✓ Разблокировано' : '🔒 Скоро...' }}
            </div>
            <p class="text-xs text-gray-600 mt-2">
              {{ achievement.date ? new Date(achievement.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <div class="inline-block bg-white rounded-2xl shadow-lg p-6">
          <p class="text-2xl font-bold text-red-500 mb-2">
            {{ achievements.filter(a => a.unlocked).length }} / {{ achievements.length }} разблокировано! 🎉
          </p>
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
