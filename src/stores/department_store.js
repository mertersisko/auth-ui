import { defineStore } from "pinia";
import api from "@/api/index";


export default defineStore("department", {
  state: () => ({
    loading: false,
    formData: {},
    user: {},
  }),
  actions: {

    async reOrderDepartments(data) {
      this.loading = true;
      await api.post('userdefinations/SortDepartment',data);
      this.loading = false;
      
    },
  },
});
