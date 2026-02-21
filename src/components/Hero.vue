<script setup lang="ts">
import { useDaysCounter } from '@/composables/useDaysCounter';
import {
  Flower,
  Flower2,
  Sprout,
  Leaf,
  Sun,
  ChevronDown,
  Sparkles,
  Heart
} from 'lucide-vue-next';

const { days, formattedTime } = useDaysCounter('2025-09-08');

const floatingIcons = [
  { icon: Flower, left: '10%', delay: '0s' },
  { icon: Sprout, left: '20%', delay: '2s' },
  { icon: Flower2, left: '30%', delay: '4s' },
  { icon: Leaf, left: '40%', delay: '1s' },
  { icon: Sun, left: '50%', delay: '3s' },
  { icon: Flower, left: '60%', delay: '5s' },
  { icon: Leaf, left: '70%', delay: '2.5s' },
  { icon: Sprout, left: '80%', delay: '4.5s' },
  { icon: Flower2, left: '90%', delay: '1.5s' },
];
</script>


<template>
  <section id="hero" class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Floating icons animation -->
    <div class="absolute inset-0 pointer-events-none">
      <component v-for="(item, index) in floatingIcons" :key="index" :is="item.icon" class="icon-float"
        :style="{ left: item.left, animationDelay: item.delay }" />
    </div>

    <div class="text-center z-10 max-w-4xl mx-auto">
      <div class="flex justify-center mb-6">
        <Flower2 class="w-16 h-16 text-emerald-500 animate-fade-in" />
      </div>
      <h1 class="text-5xl md:text-7xl font-bold text-emerald-500 mb-6 animate-fade-in">
        Привет, Каныкей!
      </h1>
      <p class="text-2xl md:text-3xl text-gray-700 mb-8 animate-fade-in-delay-1 flex items-center justify-center gap-3">
        Добро пожаловать на наш весенний сайт!
        <Sparkles class="w-8 h-8 text-yellow-500" />
      </p>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8 animate-fade-in-delay-2">
        <h2 class="text-3xl font-bold text-emerald-500 mb-4 flex items-center justify-center gap-2">
          Мы вместе уже
          <Heart class="w-6 h-6 fill-emerald-500 text-emerald-500" />
        </h2>
        <div class="text-6xl font-bold text-emerald-600 mb-2">
          {{ days }}
        </div>
        <div class="text-2xl text-gray-600 flex items-center justify-center gap-2">
          {{ days === 1 ? 'день' : days
            < 5 ? 'дня' : 'дней' }} <Sprout class="w-6 h-6 text-emerald-500" />
        </div>
        <div class="text-xl text-gray-500 mt-2">
          ({{ formattedTime }})
        </div>
      </div>

      <div class="space-y-4 animate-fade-in-delay-3 px-4">
        <p class="text-xl text-gray-700">
          Этот сайт обновлен специально для тебя, моя любимая!
        </p>
        <p class="text-lg text-gray-600">
          Весна - время расцвета нашей любви и новых воспоминаний!
        </p>
        <div class="flex flex-col items-center mt-6 gap-2">
          <p class="text-md text-gray-500">
            Листай вниз или используй меню сверху, чтобы исследовать!
          </p>
          <ChevronDown class="w-6 h-6 text-emerald-400 animate-bounce" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay-1 {
  animation: fade-in 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 1s ease-out 0.6s both;
}

.animate-fade-in-delay-3 {
  animation: fade-in 1s ease-out 0.9s both;
}

@keyframes float-up {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

.icon-float {
  position: absolute;
  bottom: -50px;
  width: 2.5rem;
  height: 2.5rem;
  animation: float-up 15s infinite;
  opacity: 0.6;
  color: #10b981;
  /* emerald-500 */
}
</style>
