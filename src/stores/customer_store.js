import { defineStore } from "pinia";
import api from "@/api/index";
import apiFormData from "@/apiFormData/index";

export default defineStore("customer", {
  state: () => ({
    loading: false,
    formData: {},
    customer: {},
    popupVisible : false,
    fileLoading: false,
    showImageLoadPopup: false,
  }),
  actions: {
    async getCustomer(id) {
        console.log("sss")
      this.popupVisible = false;
      await api
        .get(`odata/customerOdata?$filter=ID eq ${id}&$top=1`)
        .then((req) => {
          this.formData = req.data.value[0];
        });
      this.popupVisible = true;
    },

    async createCustomer() {
      this.loading = true;
      var result = await api.post("customer/Createcustomer", this.formData);
      this.loading = false;
      return result;
    },

    async updateCustomer() {
      this.loading = true;
      var result = await api.post(`customer/updatecustomer`, this.formData);
      this.loading = false;
      return result;
    },

    async deleteCustomer(id) {
      this.loading = true;
      var result = await api.delete(`customer/deletecustomer/${id}`);
      this.loading = false;
      return result;
    },

    async uploadImages(tempFormData) {
      return await apiFormData.post("customer/SaveCustomerLogo/", tempFormData);
    },
  },
});
