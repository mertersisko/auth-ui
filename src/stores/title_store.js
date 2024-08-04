import { defineStore } from "pinia";
import api from "@/api/index";


export default defineStore("title", {
  state: () => ({
    loading: false,
    formData: {},
    user: {},
  }),
  actions: {

    async reOrderTitles(data) {
      this.loading = true;
      await api.post('userdefinations/SortTitle',data);
      this.loading = false;
      
    },
  },
});
