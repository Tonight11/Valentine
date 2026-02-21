<script setup lang="ts">
import { ref } from 'vue';
import { songs } from '@/data/music';
import {
  Volume2,
  VolumeX,
  SkipForward,
  ListMusic,
  X,
  Pause,
  Heart
} from 'lucide-vue-next';

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
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <!-- Playlist Modal (shows above controls) -->
    <div v-if="showPlaylist"
      class="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-80 md:w-96 border border-emerald-100 mb-2 transform transition-all animate-fade-in animate-scale-in origin-bottom-right">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <ListMusic class="w-6 h-6 text-emerald-500" />
          <h3 class="text-xl font-bold text-emerald-500">Наш плейлист</h3>
        </div>
        <button @click="showPlaylist = false"
          class="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-all">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div v-for="(song, index) in songs" :key="song.id" :class="[
          'p-4 rounded-2xl transition-all cursor-pointer group',
          index === currentSongIndex
            ? 'bg-gradient-to-r from-emerald-50 to-lime-50 border-2 border-emerald-300'
            : 'bg-gray-50 hover:bg-emerald-50 border-2 border-transparent'
        ]">
          <div class="flex items-center justify-between mb-2">
            <div>
              <h4 class="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{{ song.name }}</h4>
              <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">{{ song.artist }}</p>
            </div>
            <div v-if="index === currentSongIndex" class="p-2 bg-emerald-500 text-white rounded-full">
              <component :is="isPlaying ? Volume2 : Pause" class="w-4 h-4" />
            </div>
          </div>
          <p class="text-xs text-gray-600 mb-2 leading-relaxed">{{ song.description }}</p>
          <div class="flex items-center gap-1.5 opacity-60">
            <Heart class="w-3 h-3 text-emerald-500 fill-emerald-500" />
            <p class="text-[10px] text-gray-500 italic">{{ song.whySpecial }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Music Controls -->
    <div
      class="bg-white/90 backdrop-blur-md rounded-full shadow-2xl p-2 border border-emerald-100 flex items-center gap-1">
      <div class="px-4 py-2 bg-emerald-50/50 rounded-full flex flex-col max-w-[150px] hidden md:flex">
        <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Сейчас играет</p>
        <p class="text-xs font-bold text-gray-700 truncate">
          {{ songs[currentSongIndex].name }}
        </p>
      </div>

      <button @click="emit('toggleMusic')"
        class="p-4 bg-emerald-500 text-white rounded-full shadow-lg transition-all hover:scale-110 hover:rotate-3 active:scale-95 group">
        <component :is="isPlaying ? Volume2 : VolumeX" class="w-6 h-6" />
      </button>

      <button @click="emit('nextSong')"
        class="p-4 bg-lime-500 text-white rounded-full shadow-lg transition-all hover:scale-110 hover:-rotate-3 active:scale-95">
        <SkipForward class="w-6 h-6" />
      </button>

      <button @click="showPlaylist = !showPlaylist"
        class="p-4 bg-teal-500 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        :class="showPlaylist ? 'rotate-90 bg-emerald-600' : ''">
        <ListMusic class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
