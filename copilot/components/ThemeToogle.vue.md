<template>
    <div class="relative">
        <button @click="dropdownOpen = !dropdownOpen"
            class="relative z-10 flex overflow-hidden rounded-full focus:outline-none size-10 bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 from-gray-100 to-gray-300 dark:text-white text-gray-900 items-center justify-center">
            <!-- svg sun -->
            <IconSun v-if="themeStore.currentTheme === 'light'" class="w-5 h-5" />
            <!-- svg moon -->
            <IconMoon v-else-if="themeStore.currentTheme === 'dark'" class="w-5 h-5" />
            <!-- svg event -->
            <IconLoading class="h-5 w-5 !mr-0 text-white" v-else-if="themeStore.currentTheme === 'event'" />
        </button>

        <div v-show="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-50 w-full h-full"></div>

        <transition enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0">
            <div v-show="dropdownOpen"
                class="absolute right-0 top-14 z-50 w-32 sm:w-36 bg-white rounded-md shadow-xl font-medium dark:bg-gray-800 my-2 dark:border-gray-200/20 dark:border-[1px]">
                <div class="w-full p-1 flex flex-col space-y-1">
                    <button @click="selectTheme('light')"
                        :class="[themeStore.currentTheme === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-700' : '']"
                        class="inline-flex w-full tracking-wide text-start p-1 sm:py-2 text-sm dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md gap-2">
                        <IconSun class="size-4 sm:size-5" />
                        Claro
                    </button>
                    <button @click="selectTheme('dark')"
                        :class="[themeStore.currentTheme === 'dark' ? 'bg-gray-700 text-white' : '']"
                        class="inline-flex w-full tracking-wide text-start p-1 sm:py-2 text-sm dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md gap-2">
                        <IconMoon class="size-4 sm:size-5" />
                        Oscuro
                    </button>
                    <button @click="selectTheme('event')"
                        :class="[themeStore.currentTheme === 'event' ? 'bg-gray-700 text-white' : '']"
                        class="inline-flex w-full tracking-wide text-start p-1 sm:py-2 text-sm dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md gap-2">
                        <IconLoading class="size-4 sm:size-5 !text-black dark:!text-white hover:!text-white !mr-0" />
                        Estacional
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import IconLoading from "@/components/icons/IconLoading.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun from "@/components/icons/IconSun.vue";
import { useThemeStore } from "@/stores/theme";
import { ref } from "vue";

const dropdownOpen = ref(false);
const themeStore = useThemeStore();

function selectTheme(theme) {
    themeStore.setTheme(theme);
}
</script>