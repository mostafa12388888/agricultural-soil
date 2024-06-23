// stores/urlStore.js
import { defineStore } from 'pinia';

export const useUrlGlobal = defineStore('Url', {
  state: () => ({
    URL: 'http://127.0.0.1:8000',
  }),
  actions: {
    setURL(newVal) {
      this.URL = newVal;
    },
  },
});
