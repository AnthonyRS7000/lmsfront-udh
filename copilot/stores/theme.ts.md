import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useDark, useStorage } from '@vueuse/core';

export const useThemeStore = defineStore('themes', () => {
    // useDark maneja automáticamente la clase 'dark' en el elemento html
    const isDark = useDark();

    // Usamos useStorage para persistir el tema actual
    const currentTheme = useStorage('current-theme', isDark ? 'dark' : 'light');
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

    // Función para cambiar entre temas
    function setTheme(theme: 'light' | 'dark' | 'event') {
        if (!document.startViewTransition) {
          // Si el navegador no soporta la API, cambia normal
          applyTheme(theme);
          return;
        }
      
        document.startViewTransition(() => {
          applyTheme(theme);
        });
    }

    function applyTheme(theme: 'light' | 'dark' | 'event') {
        currentTheme.value = theme;

        // Para los temas 'light' y 'dark', usamos el toggleDark de VueUse
        if (theme === 'light') {
            isDark.value = false;
            favicon.href = '/titulacion/copiloto_ico_light.png';
            document.documentElement.classList.remove('event-theme');
            document.documentElement.classList.remove('bg-gray-900');
            document.documentElement.classList.add('bg-gray-100');
        }
        else if (theme === 'dark') {
            isDark.value = true;
            favicon.href = '/titulacion/copiloto_ico_dark.png';
            document.documentElement.classList.remove('event-theme');
            document.documentElement.classList.remove('bg-gray-100');
            document.documentElement.classList.add('bg-gray-900');
        }
        // Para el tema 'event', activamos el modo oscuro y añadimos una clase adicional
        else if (theme === 'event') {
            isDark.value = true; // El tema event se basa en el tema oscuro
            favicon.href = '/titulacion/copiloto_ico_dark.png';
            document.documentElement.classList.add('event-theme');
        }
    }

    // Observar cambios en el tema para aplicar la clase 'event-theme' correctamente
    watch(currentTheme, (newTheme) => {
        if (newTheme === 'event') {
            document.documentElement.classList.add('event-theme');
        } else {
            document.documentElement.classList.remove('event-theme');
        }
    });

    watch(isDark, (val) => {
      document.documentElement.classList.toggle('dark', val);
      document.documentElement.classList.toggle('light', !val);
    });

    return {
        isDark,
        currentTheme,
        setTheme
    };
});