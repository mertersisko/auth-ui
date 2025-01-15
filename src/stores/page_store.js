import { defineStore } from "pinia";
import api from "@/api/index";


export default defineStore("page", {
  state: () => ({
    loading: false,
    formData: {},
    user: {},
  }),
  actions: {
   
    // async updatePages() {
    //   this.loading = true;
    //   var result = await api.post(
    //     `ybsservice/odata/ClientOdata(${this.formData.ID})`,
    //     this.formData
    //   );
   
    //   this.loading = false;
    //   return result;
    // },

    async reOrderPages(data) {
      this.loading = true;
      await api.post('userrole/SortPages',data);
      this.loading = false;
      
    },
  },
});
