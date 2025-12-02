<script setup lang="ts">
import { ref } from 'vue';


const activeGame = ref<'compliment' | 'date' | null>(null);


// Compliment Generator
const compliments = [
  'Ты самая красивая девушка на свете! 😍',
  'Твоя улыбка освещает мой день! ☀️',
  'Ты делаешь меня счастливым каждый день! 💕',
  'С тобой я чувствую себя на седьмом небе! ☁️',
  'Ты моя мечта, ставшая реальностью! ✨',
  'Твои глаза - это целая вселенная! 🌌',
  'Ты идеальна во всём! 💖',
  'Я так горжусь тобой! 🌟',
  'Ты самая умная и талантливая! 🎓',
  'С тобой время летит незаметно! ⏰',
  'Ты моё вдохновение! 🎨',
  'Твоя доброта не знает границ! 💝',
  'Ты делаешь мир лучше! 🌍',
  'Я влюбляюсь в тебя снова каждый день! 💘',
  'Ты моё всё! ❤️',
];

const currentCompliment = ref('');

const generateCompliment = () => {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  currentCompliment.value = compliments[randomIndex];
};

// Date Wheel
const dateIdeas = [
  '🎬 Сходить в кино',
  '🍕 Ужин в любимом ресторане',
  '🌳 Прогулка в парке',
  '🎨 Посетить выставку',
  '🎮 Игровой вечер дома',
  '🏞️ Пикник на природе',
  '🎭 Театр или концерт',
  '🍰 Попробовать новое кафе',
  '🏊 Бассейн или аквапарк',
  '🎳 Боулинг',
  '🚴 Велопрогулка',
  '📚 Книжный магазин и кофе',
  '🌅 Встретить рассвет вместе',
  '🌃 Прогулка по ночному городу',
  '🎪 Парк аттракционов',
];

const currentDateIdea = ref('');
const isSpinning = ref(false);

const spinWheel = () => {
  isSpinning.value = true;
  let spins = 0;
  const maxSpins = 20;
  
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * dateIdeas.length);
    currentDateIdea.value = dateIdeas[randomIndex];
    spins++;
    
    if (spins >= maxSpins) {
      clearInterval(interval);
      isSpinning.value = false;
    }
  }, 100);
};
</script>

<template>
  <section id="games" class="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-red-500 mb-4">
        🎮 Мини-игры для нас
      </h2>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Немного развлечений! 💕
      </p>

      <!-- Game Selection -->
      <div v-if="!activeGame" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          @click="activeGame = 'compliment'"
          class="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-red-300"
        >
          <div class="text-6xl mb-4">💝</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Генератор комплиментов</h3>
          <p class="text-gray-600">Получи случайный комплимент!</p>
        </button>

        <button
          @click="activeGame = 'date'"
          class="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-blue-300"
        >
          <div class="text-6xl mb-4">🎡</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Колесо свиданий</h3>
          <p class="text-gray-600">Случайная идея для свидания!</p>
        </button>
      </div>


      <!-- Compliment Generator -->
      <div v-if="activeGame === 'compliment'" class="max-w-2xl mx-auto">
        <button
          @click="activeGame = null"
          class="mb-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          ← Назад к играм
        </button>
        
        <div class="bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl shadow-2xl p-12">
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">💝</div>
            <h3 class="text-3xl font-bold text-red-600 mb-4">Генератор комплиментов</h3>
          </div>

          <div v-if="currentCompliment" class="mb-8 min-h-[100px] flex items-center justify-center">
            <p class="text-2xl md:text-3xl text-gray-800 text-center animate-fade-in">
              {{ currentCompliment }}
            </p>
          </div>
          <div v-else class="mb-8 min-h-[100px] flex items-center justify-center">
            <p class="text-xl text-gray-500 text-center">
              Нажми кнопку, чтобы получить комплимент! 👇
            </p>
          </div>

          <div class="text-center">
            <button
              @click="generateCompliment"
              class="px-8 py-4 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Получить комплимент! 💖
            </button>
          </div>
        </div>
      </div>

      <!-- Date Wheel -->
      <div v-if="activeGame === 'date'" class="max-w-2xl mx-auto">
        <button
          @click="activeGame = null"
          class="mb-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          ← Назад к играм
        </button>
        
        <div class="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl shadow-2xl p-12">
          <div class="text-center mb-8">
            <div class="text-6xl mb-4">🎡</div>
            <h3 class="text-3xl font-bold text-blue-600 mb-4">Колесо свиданий</h3>
          </div>

          <div class="mb-8 min-h-[100px] flex items-center justify-center">
            <p
              v-if="currentDateIdea"
              :class="[
                'text-2xl md:text-3xl text-gray-800 text-center font-bold',
                isSpinning ? 'animate-pulse' : 'animate-fade-in'
              ]"
            >
              {{ currentDateIdea }}
            </p>
            <p v-else class="text-xl text-gray-500 text-center">
              Крути колесо, чтобы получить идею для свидания! 👇
            </p>
          </div>

          <div class="text-center">
            <button
              @click="spinWheel"
              :disabled="isSpinning"
              :class="[
                'px-8 py-4 text-white text-lg rounded-full transition-all shadow-lg hover:shadow-xl transform',
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              ]"
            >
              {{ isSpinning ? 'Крутится...' : 'Крутить колесо! 🎡' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 0.5s ease-in-out infinite;
}
</style>
