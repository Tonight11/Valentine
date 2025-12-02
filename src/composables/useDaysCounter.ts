import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useDaysCounter(startDate: string) {
    const now = ref(new Date());
    const start = new Date(startDate);

    const updateTime = () => {
        now.value = new Date();
    };

    const days = computed(() => {
        const diff = now.value.getTime() - start.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    });

    const months = computed(() => {
        const yearsDiff = now.value.getFullYear() - start.getFullYear();
        const monthsDiff = now.value.getMonth() - start.getMonth();
        return yearsDiff * 12 + monthsDiff;
    });

    const hours = computed(() => {
        const diff = now.value.getTime() - start.getTime();
        return Math.floor(diff / (1000 * 60 * 60));
    });

    const formattedTime = computed(() => {
        const years = Math.floor(months.value / 12);
        const remainingMonths = months.value % 12;

        const parts = [];
        if (years > 0) parts.push(`${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`);
        if (remainingMonths > 0) parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'месяц' : remainingMonths < 5 ? 'месяца' : 'месяцев'}`);
        if (parts.length === 0) parts.push(`${days.value} ${days.value === 1 ? 'день' : days.value < 5 ? 'дня' : 'дней'}`);

        return parts.join(' ');
    });

    let interval: number;

    onMounted(() => {
        interval = window.setInterval(updateTime, 60000); // Update every minute
    });

    onUnmounted(() => {
        if (interval) clearInterval(interval);
    });

    return {
        days,
        months,
        hours,
        formattedTime,
    };
}
