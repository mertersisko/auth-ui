<template>
  <div>
    <v-card outlined flat border>
      <v-card-title class="custom-card-title">
        <v-icon color="blue darken-2">{{ props.cardConf.icon }}</v-icon>
        {{ props.cardConf.text }}
        <v-spacer></v-spacer>
        <slot name="buttons"></slot>
      </v-card-title>

      <v-card-text>
        <v-divider class="mb-5"></v-divider>
        <slot name="content"></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["cardConf"]);
</script>
