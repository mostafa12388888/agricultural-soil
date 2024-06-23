// stores/urlStore.js
import { defineStore } from 'pinia';

export const useUrlGlobal = defineStore('Url', {
  state: () => ({
    URL: '',
  }),
  actions: {
    setURL(newVal) {
      this.URL = newVal;
    },
  },
});
