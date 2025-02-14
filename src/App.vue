<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from "@vueuse/core";
import Quiz from "@/components/Quiz.vue";
import Congratulations from "@/components/Congratulations.vue";
import ParticlesBg from '@/components/ui/particle/ParticlesBg.vue'


const songs = ref([
  { src: "/love-theme.mp3", name: "Love Theme" },
  { src: "/jap.mp3", name: "Romantic Melody" },
]);
// Проверяем, проходил ли пользователь квиз
const currentSongIndex = ref(0);
const isCompleted = useLocalStorage("quizCompleted", false);
// Аудио для фона
const audio = ref(new Audio(songs.value[currentSongIndex.value].src));
audio.value.loop = true; // Зацикливаем
const isPlaying = ref(true);

// Функция для управления музыкой
const toggleMusic = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const nextSong = () => {
  currentSongIndex.value = (currentSongIndex.value + 1) % songs.value.length;
  audio.value.pause();
  audio.value = new Audio(songs.value[currentSongIndex.value].src);
  audio.value.loop = true;
  if (isPlaying.value) audio.value.play();
};

// Следим за завершением квиза и включаем музыку
watch(isCompleted, (newVal) => {
  if (newVal) {
    audio.value.play();
    isPlaying.value = true;
  }
});

onMounted(() => {
  isPlaying.value = true;
  audio.value.play();
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-pink-100 pt-20 px-2">
    <Quiz class="relative z-[100] px-10" v-if="!isCompleted" />
    <Congratulations class="relative z-[100]" v-else />
    <div class="absolute z-[200] top-4 right-4 flex gap-2">
      <button class=" p-3 bg-red-500 text-white rounded-full shadow-md transition-transform hover:scale-110"
        @click="toggleMusic">
        {{ isPlaying ? "🔊 Выключить" : "🎵 Включить" }}
      </button>
      <button class="p-3 bg-red-500 text-white rounded-full shadow-md transition-transform hover:scale-110"
        @click="nextSong">
        ⏭ {{ songs[currentSongIndex].name }}
      </button>
    </div>
    <ParticlesBg class="absolute inset-0 w-full h-full -z-1" :quantity="100" :ease="100" :color="'#ef4444'"
      :staticity="10" refresh />
  </div>
</template>

<style scoped>
/* Анимация появления */
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

div {
  animation: fade-in 1s ease-out;
}
</style>
