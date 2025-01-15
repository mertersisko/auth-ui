import { defineStore } from "pinia";
import api from "@/api/index";
import apiFormData from "@/apiFormData/index";

export default defineStore("user", {
  state: () => ({
    loading: false,
    formData: {},
    user: {},
    showEditPopup: false,
    showRolePopup: false,
    lookuploaded: false,
    departmentList: [],
    titleList: [],
    roleTemplateList: [],
    userList: [],
    pageTemplateList: [],
    selectedUserId: 0,
    fileLoading: false,
    showImageLoadPopup: false,
  }),
  actions: {
    async getUser(id) {
      this.selectedUserId = id;
      this.loading = true;
      this.showEditPopup = false;

      await api.get(`user/getuser/${id}`).then((res) => {
        console.log(res);
        this.formData = res.data.data;
        console.log(this.formData);
      });

      await this.loadLookups();
      this.loading = false;
      this.showEditPopup = true;
    },

    async createUser() {
      this.loading = true;
      var result = await api.post("user/CreateUser", this.formData);
      this.loading = false;
      return result;
    },

    async updateUser() {
      this.loading = true;
      var result = await api.post(`user/updateUser`, this.formData);
      this.loading = false;
      return result;
    },

    async deleteUser(id) {
      this.loading = true;
      var result = await api.delete(`user/deleteUser/${id}`);
      this.loading = false;
      return result;
    },

    /* edit formdaki lookuplar */
    async loadLookups() {
      if (!this.lookuploaded) {
        await api.get("odata/DepartmentOData").then((res) => {
          if (res) this.departmentList = res.data.value;
        });

        await api.get("odata/TitleOdata").then((res) => {
          if (res) this.titleList = res.data.value;
        });

        await api.get("odata/RoleTemplateOData").then((res) => {
          if (res) this.roleTemplateList = res.data.value;
        });

        this.lookuploaded = true;
      }
    },

    async fillUserLookup() {
      await api.get("user/getuserlist").then((result) => {
        console.log(result);
        this.userList = result.data.data;
      });
    },

    async getUserList() {
      await api.get("user/getuserlist").then((result) => {
        console.log(result.data);
        return result.data.data;
      });
    },
    /* ROL */
    async getRoles(id) {
      this.selectedUserId = id;
      this.loading = true;
      this.showRolePopup = false;
      await api.get(`userrole/GetUserPages/${id}`).then((res) => {
        this.pageTemplateList = res.data;
        console.log(this.pageTemplateList);
      });

      this.loading = false;
      this.showRolePopup = true;
    },

    async createPageTemplate(data) {
      this.loading = true;
      await api.post("userrole/CreateUserRole", data);
      this.loading = false;
    },

    /* resim */
    async uploadImages(tempFormData) {
      return await apiFormData.post("user/SaveUserImage/", tempFormData);
    },
  },
});
