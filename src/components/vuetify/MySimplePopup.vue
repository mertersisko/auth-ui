<template>
  <v-dialog v-bind="attrs" persistent >
    <v-card>
      <v-toolbar color="grey-darken-3" density="compact">
        
        <v-toolbar-title color="white" >{{ props.title }}</v-toolbar-title>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="ml-5 mr-5 mt-5 mb-5"> <slot></slot></div>
     
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, useAttrs, defineProps } from "vue";
const emit = defineEmits(["close"]);
const props = defineProps(["title"]);
const attrs = useAttrs();

const close = () => {
  emit("close");
};


</script>
