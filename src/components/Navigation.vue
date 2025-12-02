<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  activeSection: string;
}>();

const emit = defineEmits<{
  navigate: [section: string];
}>();

const mobileMenuOpen = ref(false);

const sections = [
  { id: 'hero', name: 'Главная', icon: '🏠' },
  { id: 'timeline', name: 'Наша история', icon: '📅' },
  { id: 'gallery', name: 'Фотографии', icon: '📸' },
  { id: 'moods', name: 'Для тебя', icon: '💭' },
  { id: 'reasons', name: 'Почему люблю', icon: '❤️' },
  { id: 'places', name: 'Наши места', icon: '📍' },
  { id: 'plans', name: 'Будущее', icon: '🌟' },
  { id: 'games', name: 'Игры', icon: '🎮' },
  { id: 'achievements', name: 'Достижения', icon: '🏆' },
];


const navigateTo = (sectionId: string) => {
  emit('navigate', sectionId);
  mobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-red-500">💕 Для моей любимой</h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:block">
          <div class="flex items-center space-x-1">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="navigateTo(section.id)"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-all',
                activeSection === section.id
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              ]"
            >
              <span class="mr-1">{{ section.icon }}</span>
              {{ section.name }}
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-md text-gray-700 hover:bg-red-100"
          >
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="navigateTo(section.id)"
          :class="[
            'w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all',
            activeSection === section.id
              ? 'bg-red-500 text-white'
              : 'text-gray-700 hover:bg-red-100'
          ]"
        >
          <span class="mr-2">{{ section.icon }}</span>
          {{ section.name }}
        </button>
      </div>
    </div>
  </nav>
</template>
