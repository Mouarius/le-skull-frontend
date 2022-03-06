import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      colors: [],
    };
  },
  actions: {
    setColors(newColors) {
      this.colors = newColors;
    },
  },
});
