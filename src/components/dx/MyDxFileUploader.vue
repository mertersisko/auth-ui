<template>
  <v-row>
    <v-col cols="12" lg="6" md="6" sm="12" xs="12">
      <div id="dropzone-external" class="flex-box">
        <img src="../../assets/dropzone.png" />
        <div id="dropzone-text" class="flex-box">
          <span style="text-align: center"
            >Dosya yüklemek için dosyaları buraya sürükleyin yada buraya
            tıklayın.</span
          >
        </div>
      </div>
    </v-col>

    <v-col cols="12" lg="6" md="6" sm="12" xs="12">
      <div class="fileUploader">
        <DxFileUploader
          label-text=""
          dialog-trigger="#dropzone-external"
          v-bind="attrs"
          drop-zone="#dropzone-external"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import DxFileUploader from "devextreme-vue/file-uploader";
import { useAttrs } from "vue";
const attrs = useAttrs();
</script>

<style scoped>
#dropzone-external {
  width: auto;
  height: 350px;
  background-color: rgba(183, 183, 183, 0.1);
  border-width: 2px;
  border-style: dashed;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}

.fileUploader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#dropzone-external img {
  padding-bottom: 5px;
}
</style>
