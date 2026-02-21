<script setup lang="ts">
import { timelineEvents } from '@/data/timeline';
import IconRenderer from '@/components/ui/IconRenderer.vue';
import { Flower2 } from 'lucide-vue-next';
</script>

<template>
  <section id="timeline" class="min-h-screen py-20 px-4 bg-white">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Flower2 class="w-10 h-10 text-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Наша история
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-16 text-lg">
        Каждый момент с тобой расцветает!
      </p>

      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-lime-300 to-emerald-300">
        </div>

        <!-- Timeline events -->
        <div v-for="(event, index) in timelineEvents" :key="event.id" :class="[
          'relative mb-12 flex items-center',
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        ]">
          <!-- Timeline dot -->
          <div
            class="absolute left-8 md:left-1/2 w-10 h-10 -ml-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
            <IconRenderer v-if="event.emoji" :name="event.emoji" :size="20" color="white" />
          </div>

          <!-- Content card -->
          <div :class="[
            'ml-20 md:ml-0 md:w-5/12',
            index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
          ]">
            <div
              class="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-100">
              <div class="flex items-center mb-3">
                <div class="p-3 bg-emerald-500 rounded-xl mr-4 text-white">
                  <IconRenderer v-if="event.emoji" :name="event.emoji" :size="24" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-emerald-700">{{ event.title }}</h3>
                  <p class="text-sm text-gray-500">{{ new Date(event.date).toLocaleDateString('ru-RU', {
                    year:
                      'numeric', month: 'long', day: 'numeric'
                  }) }}</p>
                </div>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
