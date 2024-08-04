<template>
  <v-snackbar v-model="errorStore.showMessageState" multi-line color="red">
    <v-list bg-color="red">
      <v-list-item v-for="message in errorStore.messages" :key="message">
        <v-list-item-title>
          {{ message }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:actions>
      <v-btn @click="errorStore.showMessageState = false"> Kapat </v-btn>
    </template>
  </v-snackbar>

  <router-view />
</template>

<script setup>
import trMessages from "devextreme/localization/messages/tr.json";
import { locale, loadMessages } from "devextreme/localization";
import errorHadler from "@/stores/error_hander_store";

var errorStore = errorHadler();

loadMessages(trMessages);
locale("tr");
</script>

<style>
#app {
  background-color: var(--v-background-base);
}

/* vuetify büyük harfi küçük harfe çevir*/
.no-uppercase {
  text-transform: unset !important;
}
</style>
