<template>
<div class="text-center">


    <v-overlay v-bind="attrs" 
    
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="100"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { useAttrs,  } from "vue";


const attrs = useAttrs();
</script>

<style lang="scss" scoped>

</style>