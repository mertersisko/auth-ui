import { defineStore } from "pinia";
import api from "@/api/index";


export default defineStore("roletemplate", {
  state: () => ({
    loading: false,
    roleTemplateData: [],
    showTemplatePopup : false,
    selectedRoleTemplate : {}
   
  }),
  actions: {
   
    async getRoleTemplate(id) {
      this.loading = true;
      await api.get(`userrole/GetTemplatePages/${id}`).then((result) => {
        
        this.roleTemplateData = result.data;
        console.log(this.roleTemplateData )
        
      });
      this.loading = false;
     
    },

    async createRoleTemplate(data) {
        this.loading = true;
        await api.post('userrole/CreateTemplatePage',data)
        this.loading = false;
       
      },
  },
});
