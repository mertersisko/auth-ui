<template>
  <v-text-field
    v-bind="attrs"
    density="compact"
    variant="outlined"
    dense
    :error="errors.anyErrors(props.errorField)"
    :error-messages="errors.getFormErrors(props.errorField)"
    type="number"
    color="blue" 
  >
  </v-text-field>
</template>

<script setup>
import { useAttrs, defineProps } from "vue";
import useErrorHandler from "@/stores/error_hander_store";
const props = defineProps(["errorField"]);
const attrs = useAttrs();
const errors = useErrorHandler();
</script>

<style lang="scss" scoped></style>
