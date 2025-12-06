<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { songs } from '@/data/music';
import Navigation from '@/components/Navigation.vue';
import Hero from '@/components/Hero.vue';
import Timeline from '@/components/Timeline.vue';
import PhotoGallery from '@/components/PhotoGallery.vue';
import MoodPhrases from '@/components/MoodPhrases.vue';
import WhyILoveYou from '@/components/WhyILoveYou.vue';
import MemoryMap from '@/components/MemoryMap.vue';
import FuturePlans from '@/components/FuturePlans.vue';
import MiniGames from '@/components/MiniGames.vue';
import Achievements from '@/components/Achievements.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import ParticlesBg from '@/components/ui/particle/ParticlesBg.vue';


const currentSongIndex = ref(0);
const audio = ref(new Audio(songs[currentSongIndex.value].src));
audio.value.loop = true;
const isPlaying = ref(false);

const activeSection = ref('hero');

// Music controls
const toggleMusic = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const nextSong = () => {
  currentSongIndex.value = (currentSongIndex.value + 1) % songs.length;
  audio.value.pause();
  audio.value = new Audio(songs[currentSongIndex.value].src);
  audio.value.loop = true;
  if (isPlaying.value) audio.value.play();
};

// Navigation
const navigateToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Auto-detect active section on scroll
const handleScroll = () => {
  const sections = ['hero', 'timeline', 'gallery', 'moods', 'reasons', 'places', 'plans', 'games', 'achievements'];
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Auto-play music on mount
  isPlaying.value = true;
  audio.value.play().catch(() => {
    // Auto-play might be blocked, user will need to click play
    isPlaying.value = false;
  });
});
</script>

<template>
  <div class="min-h-screen bg-pink-50">
    <!-- Navigation -->
    <Navigation :activeSection="activeSection" @navigate="navigateToSection" />

    <!-- Main Content -->
    <div class="pt-16">
      <Hero />
      <Timeline />
      <PhotoGallery />
      <MoodPhrases />
      <WhyILoveYou />
      <!-- <MemoryMap /> -->
      <FuturePlans />
      <MiniGames />
      <Achievements />
    </div>


    <!-- Music Player -->
    <MusicPlayer
      :currentSongIndex="currentSongIndex"
      :isPlaying="isPlaying"
      @toggleMusic="toggleMusic"
      @nextSong="nextSong"
    />

    <!-- Particle Background -->
    <ParticlesBg
      class="fixed inset-0 w-full h-full -z-1 pointer-events-none"
      :quantity="50"
      :ease="100"
      :color="'#ef4444'"
      :staticity="10"
      refresh
    />
  </div>
</template>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Global animations */
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
</style>
