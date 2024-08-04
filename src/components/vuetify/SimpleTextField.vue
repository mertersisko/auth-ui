<template>
    <v-text-field v-bind="attrs" density="compact" variant="outlined" dense 
    :error="errors.anyErrors(props.errorField)"
    :error-messages = "errors.getFormErrors(props.errorField)"
    type="text" color="blue" 
    
    >

    </v-text-field>
</template>

<script setup>
import {  useAttrs ,defineProps } from "vue";
import useErrorHandler from "@/stores/error_hander_store"
const props = defineProps(["errorField"]);
const attrs = useAttrs();
const errors= useErrorHandler();
</script>

<style  scoped>
::v-deep  .v-input--is-focused .v-input__slot {
  border: 2px solid #005fcc !important;
  border-bottom-color: rgba(168, 14, 14, 0.38) !important;
}
</style>