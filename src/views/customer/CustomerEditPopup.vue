<template>
  <v-row>
    <v-col cols="12" sm="12" xs="12" md="9" lg="9">
      <v-form @submit.prevent ref="form">
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="customerStore.formData.FullName"
              label="Müşteri Kodu"
              :errorField="'FullName'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="customerStore.formData.ShortName"
              label="Müşteri Kısa Adı"
              :errorField="'ShortName'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="customerStore.formData.AuthName"
              label="Sorumlu Adı"
              :errorField="'AuthName'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="customerStore.formData.AuthSurname"
              label="Sorumlu Soyadı"
              :errorField="'AuthSurname'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
            :rules="[nullValueRule]"
              v-model="customerStore.formData.AuthEmail"
              label="Sorumlu Email"
              :errorField="'AuthEmail'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
            :rules="[nullValueRule]"
              v-model="customerStore.formData.AuthPhoneNumber"
              label="Telefon"
              :errorField="'AuthPhoneNumber'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              v-model="customerStore.formData.WebSite"
              label="WebSite"
              :errorField="'WebSite'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              v-model="customerStore.formData.Country"
              label="Ülke"
              :errorField="'Country'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              v-model="customerStore.formData.City"
              label="Şehir"
              :errorField="'City'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              v-model="customerStore.formData.District"
              label="İlçe"
              :errorField="'District'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="12" xs="12" class="py-1" >
            <simple-text-field
              
              v-model="customerStore.formData.Address"
              label="Adres"
              :errorField="'Address'"
            />
          </v-col>

         
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="12" sm="12" xs="12" md="3" lg="3">
      <div class="form-avatar">
        <v-img
          :width="200"
          :height="200"
          :src="customerStore.formData.Logo"
        ></v-img>
        <v-btn
          variant="tonal"
          class="no-uppercase"
          @click="customerStore.showImageLoadPopup = true"
          >Resim Yükle / Değiştir</v-btn
        >
      </div>
    </v-col>
  </v-row>

    <!-- IMAGE YÜKLEME POPUP -->
    <my-edit-popup
    :btnloading="customerStore.fileLoading"
    width="50%"
    :fullscreen="false"
    v-model="customerStore.showImageLoadPopup"
    @close="customerStore.showImageLoadPopup = false"
    @save="saveImageToServer"
    title="Resim Yükle"
  >
    <my-dx-file-uploader
      @value-changed="onValueChangedImage"
      :multiple="false"
      ref="flUploadImage"
      upload-mode="form"
      accept="image/*"
      :allowed-file-extensions="['.png', '.jpg', '.jpeg', '.bmp']"
    />
  </my-edit-popup>
</template>

<script setup>

//todo : resim yükleme yapılacak

import config from "@/config.js";
import { ref, defineExpose } from "vue";
import useCustomerStore from "@/stores/customer_store";
const customerStore = useCustomerStore();
const form = ref();
let tempFormData = new FormData();

const nullValueRule = (v) => {
  return !!v || config.requiredMessage;
};

const validateForm = async () => {
  return await form.value.validate();
};

/* her resim eklendiğinde ve silindiğinde çalışır ve storu günceller*/
const onValueChangedImage = (e) => {
  console.log(e);
  tempFormData = new FormData();
  tempFormData.append("file", e.value[0]);
  console.log(tempFormData);
};

/* resim ekleme popup ındaki kaydete basınca çalışır */
const saveImageToServer = () => {
  customerStore.fileLoading = true;

  customerStore.uploadImages(tempFormData).then((res) => {
    console.log(res);
    customerStore.formData.Logo = res.data.data.fullPath;
    customerStore.showImageLoadPopup = false;
  });

  customerStore.fileLoading = false;
};

defineExpose({
  validateForm,
});

</script>

<style scoped>
.form-avatar {
  margin: auto;
  height: 250px;
  width: 250px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

