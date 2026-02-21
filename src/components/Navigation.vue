<script setup lang="ts">
import { ref } from 'vue';
import {
  Home,
  History,
  Camera,
  MessageCircle,
  Mail,
  Heart,
  MapPin,
  Star,
  Gamepad2,
  Trophy,
  Gift,
  Flower2,
  Menu,
  X
} from 'lucide-vue-next';

const props = defineProps<{
  activeSection: string;
}>();

const emit = defineEmits<{
  navigate: [section: string];
}>();

const mobileMenuOpen = ref(false);

const sections = [
  { id: 'hero', name: 'Главная', icon: Home },
  { id: 'timeline', name: 'Наша история', icon: History },
  { id: 'gallery', name: 'Фотографии', icon: Camera },
  { id: 'moods', name: 'Для тебя', icon: MessageCircle },
  { id: 'letters', name: 'Письма', icon: Mail },
  { id: 'reasons', name: 'Почему люблю', icon: Heart },
  { id: 'places', name: 'Наши места', icon: MapPin },
  { id: 'plans', name: 'Будущее', icon: Star },
  { id: 'games', name: 'Игры', icon: Gamepad2 },
  { id: 'achievements', name: 'Достижения', icon: Trophy },
  { id: 'quiz', name: 'Сюрприз', icon: Gift },
];


const navigateTo = (sectionId: string) => {
  emit('navigate', sectionId);
  mobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <Flower2 class="w-6 h-6 text-emerald-500" />
          <h1 class="text-2xl font-bold text-emerald-500">Для моей любимой</h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:block">
          <div class="flex items-center space-x-1">
            <button v-for="section in sections" :key="section.id" @click="navigateTo(section.id)" :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2',
              activeSection === section.id
                ? 'bg-emerald-500 text-white'
                : 'text-gray-700 hover:bg-emerald-100'
            ]">
              <component :is="section.icon" class="w-4 h-4" />
              {{ section.name }}
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-gray-700 hover:bg-emerald-100">
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button v-for="section in sections" :key="section.id" @click="navigateTo(section.id)" :class="[
          'w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all flex items-center gap-3',
          activeSection === section.id
            ? 'bg-emerald-500 text-white'
            : 'text-gray-700 hover:bg-emerald-100'
        ]">
          <component :is="section.icon" class="w-5 h-5" />
          {{ section.name }}
        </button>
      </div>
    </div>
  </nav>
</template>
