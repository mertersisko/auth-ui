import { defineStore } from "pinia";
//import api from "@/api/index";

export default defineStore("file", {
  state: () => ({
    loading: false,
  }),

  actions: {
    async downloadFile(url) {
      window.open(url, "_blank");
    },
  },
});
