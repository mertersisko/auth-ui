<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content> Kullanıcı Sayfası </template>
  </my-custom-card>
</template>

<script setup>
const cardConf = {
  icon: "mdi-account-key",
  text: "Kullanıcı Profili",
};
</script>

<style lang="scss" scoped></style>
