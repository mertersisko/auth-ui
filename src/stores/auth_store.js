import { defineStore } from "pinia";
import api from "@/api/index";
import router from "@/router";

export default defineStore("auth", {
  state: () => ({
    loading: false,
    formData: {},
    user: {},
  }),
  actions: {
    async login() {
      this.loading = true;
      var store = await api.post("Security/Login",  this.formData);
     
      this.loading = false;
      if(store)
        this.setJWT(store);
      return store;
    },

    logout() {
      localStorage.removeItem("key");
      localStorage.removeItem("user");
      localStorage.clear();
      router.push("/login")
    },

    getLoggedUser() {
      return JSON.parse(localStorage.getItem("user"));
    },

    setJWT(store) {
      localStorage.setItem(
        "user",
        JSON.stringify(this.parseJwt(store.data.data))
      );
     
      localStorage.setItem("key", store.data.data);
      this.user = this.parseJwt(store.data.data);
    },
    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },

    
  },
});
