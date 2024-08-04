<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      expand-on-hover
      color="#2B2F39"
      dark
    >
      <v-list-item
        :prepend-avatar="avatar"
        nav
        height="48"
        color="#2C303B"
        class="custom-app-title"
      >
       Auth
      </v-list-item>

      <v-divider></v-divider>

      <SideBar />
    </v-navigation-drawer>

    <v-app-bar tile app elevation="0" height="65" density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-menu open-on-hover open-on-click top offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon color="info">mdi-account</v-icon>
          </v-btn>

          <div class="row">
            <p class="blue--text">{{ currentUser.UserName }}</p>
          </div>
        </template>

        <v-list class="toolbar-menu">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :prepend-icon="item.icon"
            @click="menuActionClick(item.action)"
          >
            <v-list-item-title :id="index" :aselectedKey="index" ref="select">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="ma-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import SideBar from "@/components/layouts/dxTree/SideBar.vue";
import { ref, computed } from "vue";
import avatar from "@/assets/avatar.png";

import useAuthStore from "@/stores/auth_store";
import router from "@/router";

const authStore = useAuthStore();
const drawer = ref(true);

const items = [
  { title: "Profil", icon: "mdi-account", action: "profile" },
  { title: "Çıkış", icon: "mdi-exit-to-app", action: "logout" },
];

const currentUser = computed(() => {
  return {
    UserName:
      authStore.getLoggedUser().name +
      " " +
      authStore.getLoggedUser().family_name,
  };
});

const menuActionClick = (action) => {
  if (action === "profile") {
    router.push("/user-profile");
  } else if (action === "logout") {
    authStore.logout();
  }
};
</script>

<style scoped>
.row {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  line-height: 1px;
  margin-top: 1px;
  margin-right: 10px;
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;

  @media only screen and (max-device-width: 640px) {
    font-size: 10px;
  }
}

.toolbar-menu {
  padding-right: 5px;
  width: 150px;
}

.custom-app-title {
  font-weight: 500;
  font-size: 1.21rem;
  /*text-align: center;*/
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
}
</style>
