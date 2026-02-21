<script setup lang="ts">
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';

const props = defineProps<{
    name: string;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
}>();

const IconComponent = computed(() => {
    // @ts-ignore
    return icons[props.name] || icons.HelpCircle;
});
</script>

<template>
    <component :is="IconComponent" :size="size || 24" :color="color" :stroke-width="strokeWidth || 2" />
</template>
