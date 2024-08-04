<template>
    <v-autocomplete v-bind="attrs" density="compact" variant="outlined"
    :error="errors.anyErrors(props.errorField)"
    :error-messages = "errors.getFormErrors(props.errorField)"
    color="blue" 
    
    >

    </v-autocomplete>
</template>

<script setup>
import {  useAttrs ,defineProps } from "vue";
import useErrorHandler from "@/stores/error_hander_store"
const props = defineProps(["errorField"]);

const attrs = useAttrs();



const errors= useErrorHandler();
</script>

<style lang="scss" scoped>

</style>