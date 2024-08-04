<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <switch-role-card title="Başlık" subTitle="AltBaşlık"></switch-role-card>
    </template>
  </my-custom-card>
</template>

<script setup>
import SwitchRoleCard from "@/components/vuetify/SwitchRoleCard.vue";

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Home",
};
</script>

<style lang="scss" scoped></style>
