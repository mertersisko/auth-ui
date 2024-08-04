<template>
  <v-dialog v-bind="attrs" fullscreen persistent  no-click-animation  transition="dialog-bottom-transition" style="z-index: 1500">
    <v-card>
      <v-toolbar color="grey-darken-3" density="compact">
        <v-btn icon dark @click="close" density="compact">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ props.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="tonal" color="white" @click="save" :loading="props.btnloading">Kaydet</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="ml-5 mr-5 mt-5 mb-5"> <slot></slot></div>
     
    </v-card>
  </v-dialog>
</template>

<script setup>

import { defineEmits, useAttrs, defineProps } from "vue";
const emit = defineEmits(["close", "save"]);
const props = defineProps(["title","btnloading"]);
const attrs = useAttrs();



const close = () => {
  emit("close");
};

const save = () => {
  emit("save");
};
</script>
