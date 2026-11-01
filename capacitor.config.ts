import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.worldbite.calories',
  appName: 'WorldBite',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://worldbite-rzma.vercel.app'
  }
};

export default config;
