<script setup lang="ts">
import { ref } from 'vue';
import { songs } from '@/data/music';

const props = defineProps<{
  currentSongIndex: number;
  isPlaying: boolean;
}>();

const emit = defineEmits<{
  toggleMusic: [];
  nextSong: [];
}>();

const showPlaylist = ref(false);
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Music Controls -->
    <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 mb-2">
      <div class="flex items-center gap-3">
        <button
          @click="emit('toggleMusic')"
          class="p-3 bg-red-500 text-white rounded-full shadow-md transition-transform hover:scale-110"
        >
          {{ isPlaying ? '🔊' : '🔇' }}
        </button>
        <button
          @click="emit('nextSong')"
          class="p-3 bg-pink-500 text-white rounded-full shadow-md transition-transform hover:scale-110"
        >
          ⏭
        </button>
        <button
          @click="showPlaylist = !showPlaylist"
          class="p-3 bg-purple-500 text-white rounded-full shadow-md transition-transform hover:scale-110"
        >
          🎵
        </button>
      </div>
      
      <div class="mt-2 text-center">
        <p class="text-sm font-medium text-gray-700">
          {{ songs[currentSongIndex].name }}
        </p>
      </div>
    </div>

    <!-- Playlist Modal -->
    <div
      v-if="showPlaylist"
      class="bg-white rounded-2xl shadow-2xl p-6 max-w-md"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-red-500">🎵 Наш плейлист</h3>
        <button
          @click="showPlaylist = false"
          class="text-gray-500 hover:text-red-500 text-2xl"
        >
          ✕
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(song, index) in songs"
          :key="song.id"
          :class="[
            'p-4 rounded-xl transition-all',
            index === currentSongIndex
              ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300'
              : 'bg-gray-50 hover:bg-gray-100'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <div>
              <h4 class="font-bold text-gray-800">{{ song.name }}</h4>
              <p class="text-sm text-gray-600">{{ song.artist }}</p>
            </div>
            <div v-if="index === currentSongIndex" class="text-2xl">
              {{ isPlaying ? '🔊' : '⏸' }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-2">{{ song.description }}</p>
          <p class="text-xs text-gray-500 italic">💕 {{ song.whySpecial }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
