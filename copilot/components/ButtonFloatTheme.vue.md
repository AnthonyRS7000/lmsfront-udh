<script setup lang="ts">
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun from "@/components/icons/IconSun.vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
function selectTheme(theme: any) {
    themeStore.setTheme(theme);
}
</script>
<template>
    <button @click="selectTheme(themeStore.isDark ? 'light': 'dark')"
        class="fixed bottom-6 right-6 z-40 rounded-full w-12 h-12 flex items-center justify-center bg-gray-800 dark:bg-slate-100 shadow-lg transition-all duration-300">
        <IconMoon class="w-5 h-5 text-white dark:hidden" v-if="!themeStore.isDark" />
        <IconSun class="w-5 h-5 text-azul hidden dark:block" v-else />
    </button>
</template>