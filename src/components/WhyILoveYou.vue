<script setup lang="ts">
import { ref } from 'vue';
import { reasons } from '@/data/reasons';
import IconRenderer from '@/components/ui/IconRenderer.vue';
import { Heart, Leaf, Eye, EyeOff } from 'lucide-vue-next';

const visibleReasons = ref<number[]>([]);

const revealReason = (id: number) => {
  if (!visibleReasons.value.includes(id)) {
    visibleReasons.value.push(id);
  }
};

const revealAll = () => {
  visibleReasons.value = reasons.map(r => r.id);
};

const hideAll = () => {
  visibleReasons.value = [];
};
</script>

<template>
  <section id="reasons" class="min-h-screen py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Heart class="w-10 h-10 text-emerald-500 fill-emerald-500" />
        <h2 class="text-4xl md:text-5xl font-bold text-center text-emerald-500">
          Почему я тебя люблю
        </h2>
      </div>
      <p class="text-center text-gray-600 mb-8 text-lg">
        Причин бесконечно много, и каждой весной их становится больше!
      </p>

      <div class="flex justify-center gap-4 mb-12">
        <button @click="revealAll"
          class="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
          <Eye class="w-5 h-5" />
          Показать все
        </button>
        <button @click="hideAll"
          class="px-8 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
          <EyeOff class="w-5 h-5" />
          Скрыть все
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="reason in reasons" :key="reason.id" @click="revealReason(reason.id)" :class="[
          'relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 cursor-pointer border',
          visibleReasons.includes(reason.id)
            ? 'bg-gradient-to-br from-emerald-100 to-lime-100 border-emerald-200'
            : 'bg-white border-gray-100 hover:border-emerald-200 shadow-md hover:shadow-xl transform hover:-translate-y-1'
        ]">
          <div class="p-6 min-h-[160px] flex flex-col items-center justify-center text-center">
            <div v-if="!visibleReasons.includes(reason.id)" class="flex flex-col items-center gap-4">
              <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <Leaf class="w-8 h-8 text-emerald-300" />
              </div>
              <p class="text-sm text-gray-400 font-medium">Нажми, чтобы открыть!</p>
            </div>
            <div v-else class="animate-fade-in flex flex-col items-center gap-3">
              <div
                class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-emerald-100">
                <IconRenderer v-if="reason.icon" :name="reason.icon" :size="32" color="#10b981" />
              </div>
              <p class="text-lg font-bold text-gray-800 leading-tight">{{ reason.text }}</p>
            </div>
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
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
