<script setup lang="ts">
import { useDaysCounter } from '@/composables/useDaysCounter';

const { days, formattedTime } = useDaysCounter('2025-09-08');
</script>


<template>
  <section id="hero" class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    <div class="text-center z-10 max-w-4xl mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold text-red-500 mb-6 animate-fade-in">
        Привет, Каныкей! 💕
      </h1>
      <p class="text-2xl md:text-3xl text-gray-700 mb-8 animate-fade-in-delay-1">
        Добро пожаловать на наш особенный сайт!
      </p>
      
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8 animate-fade-in-delay-2">
        <h2 class="text-3xl font-bold text-red-500 mb-4">
          Мы вместе уже:
        </h2>
        <div class="text-6xl font-bold text-red-600 mb-2">
          {{ days }}
        </div>
        <div class="text-2xl text-gray-600">
          {{ days === 1 ? 'день' : days < 5 ? 'дня' : 'дней' }} ❤️
        </div>
        <div class="text-xl text-gray-500 mt-2">
          ({{ formattedTime }})
        </div>
      </div>

      <div class="space-y-4 animate-fade-in-delay-3">
        <p class="text-xl text-gray-700">
          Этот сайт создан специально для тебя, моя любимая! 🌹
        </p>
        <p class="text-lg text-gray-600">
          Здесь собраны наши воспоминания, мои чувства и всё, что я хочу тебе сказать! 💖
        </p>
        <p class="text-md text-gray-500 mt-6">
          Листай вниз или используй меню сверху, чтобы исследовать! ⬇️
        </p>
      </div>

      <!-- Floating hearts animation -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="heart-float" style="left: 10%; animation-delay: 0s;">❤️</div>
        <div class="heart-float" style="left: 20%; animation-delay: 2s;">💕</div>
        <div class="heart-float" style="left: 30%; animation-delay: 4s;">💖</div>
        <div class="heart-float" style="left: 40%; animation-delay: 1s;">💗</div>
        <div class="heart-float" style="left: 50%; animation-delay: 3s;">💝</div>
        <div class="heart-float" style="left: 60%; animation-delay: 5s;">💘</div>
        <div class="heart-float" style="left: 70%; animation-delay: 2.5s;">💞</div>
        <div class="heart-float" style="left: 80%; animation-delay: 4.5s;">💓</div>
        <div class="heart-float" style="left: 90%; animation-delay: 1.5s;">💟</div>
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

.heart-float {
  position: absolute;
  bottom: -50px;
  font-size: 2rem;
  animation: float-up 15s infinite;
  opacity: 0.6;
}
</style>
