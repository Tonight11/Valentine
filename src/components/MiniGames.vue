<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import {
  Gamepad2,
  Heart,
  FerrisWheel,
  ArrowLeft,
  Sparkles,
  Flower2
} from 'lucide-vue-next';


const activeGame = ref<'compliment' | 'date' | 'egg-catch' | null>(null);

// Egg Catch Game
const gameContainer = ref<HTMLElement | null>(null);
const score = ref(0);
const missed = ref(0);
const isGameOver = ref(false);
const isWon = ref(false);
const basketX = ref(25); // percentage
const eggs = ref<{ id: number; x: number; y: number; speed: number }[]>([]);
const EGG_SIZE = 60;
const BASKET_WIDTH = 120;
const keys = ref<{ [key: string]: boolean }>({});
let gameLoopId: number | null = null;
let lastSpawnTime = 0;

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = computed(() => breakpoints.smaller('md').value);

const startEggCatch = () => {
  if (isMobile.value) return;
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  score.value = 0;
  missed.value = 0;
  isGameOver.value = false;
  isWon.value = false;
  eggs.value = [];
  basketX.value = 25;
  lastSpawnTime = performance.now();
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  gameLoopId = requestAnimationFrame(gameLoop);
};

const handleKeyDown = (e: KeyboardEvent) => {
  keys.value[e.code] = true;
  if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
    e.preventDefault();
  }
};

const handleKeyUp = (e: KeyboardEvent) => {
  keys.value[e.code] = false;
};

const gameLoop = (timestamp: number) => {
  if (isGameOver.value || isWon.value || activeGame.value !== 'egg-catch') {
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    return;
  }

  // Keyboard controls
  const moveSpeed = 0.5;
  if (keys.value['ArrowLeft'] || keys.value['KeyA']) {
    basketX.value = Math.max(5, basketX.value - moveSpeed);
  }
  if (keys.value['ArrowRight'] || keys.value['KeyD']) {
    basketX.value = Math.min(95, basketX.value + moveSpeed);
  }

  // Spawn egg
  const spawnRate = Math.max(1000, 2000 - Math.floor(score.value / 10) * 100);
  if (timestamp - lastSpawnTime > spawnRate) {
    eggs.value.push({
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90%
      y: -5,
      speed: 0.5 + Math.floor(score.value / 10) * 0.15
    });
    lastSpawnTime = timestamp;
  }

  // Update eggs
  for (let i = eggs.value.length - 1; i >= 0; i--) {
    const egg = eggs.value[i];
    egg.y += egg.speed;

    // Check collision
    if (egg.y > 82 && egg.y < 88) {
      if (gameContainer.value) {
        // More generous collision Detection
        const basketRange = (BASKET_WIDTH / 2 / gameContainer.value.clientWidth) * 100;
        if (Math.abs(egg.x - basketX.value) < basketRange + 2) {
          score.value++;
          eggs.value.splice(i, 1);
          if (score.value >= 50) {
            isWon.value = true;
          }
          continue;
        }
      }
    }

    // Missed egg
    if (egg.y > 100) {
      missed.value++;
      eggs.value.splice(i, 1);
      if (missed.value >= 5) {
        isGameOver.value = true;
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      }
    }
  }

  gameLoopId = requestAnimationFrame(gameLoop);
};


onUnmounted(() => {
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
});

// Compliment Generator
const compliments = [
// ... (rest of the code depends on where exactly it was cut)
  'Ты самая красивая девушка на свете!',
  'Твоя улыбка освещает мой день!',
  'Ты делаешь меня счастливым каждый день!',
  'С тобой я чувствую себя на седьмом небе!',
  'Ты моя мечта, ставшая реальностью!',
  'Твои глаза - это целая вселенная!',
  'Ты идеальна во всём!',
  'Я так горжусь тобой!',
  'Ты самая умная и талантливая!',
  'С тобой время летит незаметно!',
  'Ты моё вдохновение!',
  'Ты делаешь мир лучше!',
  'Я влюбляюсь в тебя снова каждый день!',
  'Ты моё всё!',
];

const currentCompliment = ref('');

const generateCompliment = () => {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  currentCompliment.value = compliments[randomIndex];
};

// Date Wheel
const dateIdeas = [
  'Сходить в кино',
  'Ужин в любимом ресторане',
  'Прогулка в парке',
  'Посетить выставку',
  'Игровой вечер дома',
  'Пикник на природе',
  'Театр или концерт',
  'Попробовать новое кафе',
  'Боулинг',
  'Велопрогулка',
  'Книжный магазин и кофе',
  'Встретить рассвет вместе',
  'Прогулка по ночному городу',
  'Парк аттракционов',
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
  }, 50);
};
</script>

<template>
  <section id="games" class="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Gamepad2 class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Мини-игры для нас
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-12 text-lg">
        Немного весеннего веселья!
      </p>

      <!-- Game Selection -->
      <div v-if="!activeGame" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <button @click="activeGame = 'compliment'"
          class="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-emerald-100 flex flex-col items-center">
          <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
            <Heart class="w-8 h-8 text-emerald-500 fill-emerald-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Генератор комплиментов</h3>
          <p class="text-gray-500 text-sm text-center">Получи весенний комплимент!</p>
        </button>

        <button @click="activeGame = 'date'"
          class="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-emerald-100 flex flex-col items-center">
          <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
            <FerrisWheel class="w-8 h-8 text-emerald-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Колесо свиданий</h3>
          <p class="text-gray-500 text-sm text-center">Случайная идея для свидания!</p>
        </button>

        <button @click="startEggCatch(); activeGame = isMobile ? null : 'egg-catch'"
          :disabled="isMobile"
          :class="[
            'bg-white rounded-3xl shadow-lg p-8 transition-all border-2 flex flex-col items-center relative',
            isMobile 
              ? 'opacity-60 cursor-not-allowed border-gray-200 grayscale' 
              : 'hover:shadow-2xl transform hover:scale-105 border-emerald-100'
          ]">
          <div v-if="isMobile" class="absolute top-4 right-4 bg-gray-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
            Desktop Only 🖥️
          </div>
          <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
            <img src="/pixel/pixel_girl.png" alt="Girl" class="w-full h-full object-contain" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Лови яйца!</h3>
          <p class="text-gray-500 text-sm text-center">
            {{ isMobile ? 'Нужна клавиатура для игры' : 'Поймай 50 яиц для Кэти!' }}
          </p>
        </button>
      </div>


      <!-- Egg Catch Game -->
      <div v-if="activeGame === 'egg-catch'" class="max-w-3xl mx-auto">
        <button @click="activeGame = null"
          class="mb-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2">
          <ArrowLeft class="w-4 h-4" />
          Назад к играм
        </button>

        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-100 relative">
          <!-- Game Info Header -->
          <div class="bg-emerald-500 p-4 flex justify-between items-center text-white px-8">
            <div class="flex items-center gap-4">
              <span class="text-xl font-bold">Счёт: {{ score }} / 50</span>
              <span class="text-sm opacity-80">(Скорость: {{ Math.floor(score / 10) + 1 }})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-bold">Пропущено:</span>
              <div class="flex gap-1">
                <Heart v-for="i in 5" :key="i"
                  :class="['w-5 h-5', i <= (5 - missed) ? 'fill-white text-white' : 'text-emerald-300 opacity-30']" />
              </div>
            </div>
          </div>

          <!-- Game Area -->
          <div ref="gameContainer" class="h-[500px] relative bg-sky-50 overflow-hidden cursor-default">
            
            <!-- Background Decoration -->
            <div class="absolute bottom-0 w-full h-20 bg-emerald-100/50"></div>
            
            <!-- Eggs -->
            <div v-for="egg in eggs" :key="egg.id" 
              class="absolute transition-none"
              :style="{ left: egg.x + '%', top: egg.y + '%', width: EGG_SIZE + 'px', height: EGG_SIZE + 'px' }">
              <div class="w-12 h-16 bg-white rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border-2 border-emerald-200 shadow-sm flex items-center justify-center text-2xl">🥚</div>
            </div>

            <!-- Catcher (Girl) -->
            <div class="absolute bottom-4 transform -translate-x-1/2 pointer-events-none"
              :style="{ left: basketX + '%' }">
              <img src="/pixel/pixel_girl.png" alt="Catcher" class="w-64 h-64 object-contain drop-shadow-md" />
              <!-- Basket indicator -->
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-emerald-500/20 rounded-full blur-md"></div>
            </div>

            <!-- Overlays -->
            <!-- Game Over -->
            <div v-if="isGameOver" 
              class="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8 z-10 animate-fade-in">
              <h3 class="text-4xl font-bold mb-4">Ой! Попробуем ещё раз?</h3>
              <p class="text-xl mb-8">Ты поймала {{ score }} яиц. Нам нужно 50!</p>
              <button @click="startEggCatch" 
                class="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold transition-all transform hover:scale-105">
                Играть снова
              </button>
            </div>

            <!-- Win -->
            <div v-if="isWon" 
              class="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 z-20 animate-fade-in text-center">
              <div class="flex gap-4 mb-6">
                <img src="/pixel/pixel_girl.png" alt="Girl" class="w-64 h-64 object-contain animate-bounce" />
                <img src="/pixel/pixel_boy.png" alt="Boy" class="w-64 h-64 object-contain animate-bounce [animation-delay:0.2s]" />
              </div>
              <h3 class="text-4xl font-bold text-emerald-600 mb-4 italic">ПОБЕДА! 🎉</h3>
              <div class="max-w-md bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 mb-8">
                <p class="text-xl text-gray-800 font-medium">
                  "Ты поймала все 50 яиц! Ты такая же быстрая и невероятная, как и в жизни. Я горжусь тобой, моя любовь!"
                </p>
              </div>
            </div>
          </div>

          <!-- Controls Help -->
          <div class="p-4 bg-gray-50 text-center text-sm text-gray-500 border-t">
            Используй стрелки на клавиатуре или клавиши A/D, чтобы ловить яйца!
          </div>
        </div>
      </div>


      <!-- Compliment Generator -->
      <div v-if="activeGame === 'compliment'" class="max-w-2xl mx-auto">
        <button @click="activeGame = null"
          class="mb-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2">
          <ArrowLeft class="w-4 h-4" />
          Назад к играм
        </button>

        <div class="bg-gradient-to-br from-emerald-100 to-lime-100 rounded-3xl shadow-2xl p-12">
          <div class="text-center mb-8 flex flex-col items-center">
            <div class="p-5 bg-white rounded-2xl shadow-sm mb-4">
              <Heart class="w-12 h-12 text-emerald-500 fill-emerald-500" />
            </div>
            <h3 class="text-3xl font-bold text-emerald-600 mb-4">Генератор комплиментов</h3>
          </div>

          <div v-if="currentCompliment"
            class="mb-8 min-h-[140px] flex items-center justify-center bg-white/50 rounded-2xl p-6 backdrop-blur-sm border border-emerald-200">
            <p class="text-2xl md:text-3xl text-gray-800 text-center animate-fade-in font-medium italic">
              "{{ currentCompliment }}"
            </p>
          </div>
          <div v-else class="mb-8 min-h-[140px] flex flex-col items-center justify-center gap-4">
            <Flower2 class="w-12 h-12 text-emerald-400 animate-bounce" />
            <p class="text-xl text-gray-500 text-center">
              Нажми кнопку, чтобы получить комплимент!
            </p>
          </div>

          <div class="text-center">
            <button @click="generateCompliment"
              class="px-10 py-4 bg-emerald-500 text-white text-lg rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Sparkles class="w-6 h-6" />
              Получить комплимент!
            </button>
          </div>
        </div>
      </div>

      <!-- Date Wheel -->
      <div v-if="activeGame === 'date'" class="max-w-2xl mx-auto">
        <button @click="activeGame = null"
          class="mb-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2">
          <ArrowLeft class="w-4 h-4" />
          Назад к играм
        </button>

        <div class="bg-gradient-to-br from-emerald-100 to-lime-100 rounded-3xl shadow-2xl p-12">
          <div class="text-center mb-8 flex flex-col items-center">
            <div class="p-5 bg-white rounded-2xl shadow-sm mb-4">
              <FerrisWheel class="w-12 h-12 text-emerald-500" />
            </div>
            <h3 class="text-3xl font-bold text-emerald-600 mb-4">Колесо свиданий</h3>
          </div>

          <div
            class="mb-8 min-h-[140px] flex items-center justify-center bg-white/50 rounded-2xl p-6 backdrop-blur-sm border border-emerald-200">
            <p v-if="currentDateIdea" :class="[
              'text-2xl md:text-3xl text-gray-800 text-center font-bold',
              isSpinning ? 'animate-pulse' : 'animate-fade-in'
            ]">
              {{ currentDateIdea }}
            </p>
            <p v-else class="text-xl text-gray-500 text-center">
              Крути колесо, чтобы получить идею для свидания!
            </p>
          </div>

          <div class="text-center">
            <button @click="spinWheel" :disabled="isSpinning" :class="[
              'px-10 py-4 text-white text-lg rounded-full transition-all shadow-lg hover:shadow-xl transform flex items-center gap-2 mx-auto',
              isSpinning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-105'
            ]">
              <FerrisWheel :class="['w-6 h-6', isSpinning ? 'animate-spin' : '']" />
              {{ isSpinning ? 'Крутится...' : 'Крутить колесо!' }}
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

  0%,
  100% {
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
