<template>
  <v-row>
    <v-col cols="12" sm="12" xs="12" md="9" lg="9">
      <v-form @submit.prevent ref="form">
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="userStore.formData.userName"
              label="Kullanıcı Adı"
              :errorField="'UserName'"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="userStore.formData.email"
              label="Email"
              :errorField="'Email'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="userStore.formData.name"
              label="Adı"
              :errorField="'Name'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="userStore.formData.surname"
              label="Soyadı"
              :errorField="'Surname'"
            />
          </v-col>

     
          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-text-field
              :rules="[nullValueRule]"
              v-model="userStore.formData.registrationNumber"
              label="RegistrationNumber"
              :errorField="'RegistrationNumber'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-text-field
              v-model="userStore.formData.phoneNumber"
              label="Telefon"
              :errorField="'PhoneNumber'"
            />
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-select-field
              :rules="[nullValueRule]"
              :items="config.userStatus"
              item-value="id"
              item-title="name"
              v-model="userStore.formData.userStatus"
              label="Kullanıcı Tipi"
              :errorField="'UserStatus'"
            />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-select-field
              :items="userStore.departmentList"
              item-value="ID"
              item-title="Name"
              v-model="userStore.formData.departmentID"
              label="Departman"
              :errorField="'DepartmentID'"
            />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-select-field
              :items="userStore.titleList"
              item-value="ID"
              item-title="Name"
              v-model="userStore.formData.titleID"
              label="Ünvan"
              :errorField="'TitleID'"
            />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xs="12" class="py-1">
            <simple-select-field
              :items="userStore.roleTemplateList"
              item-value="ID"
              item-title="Name"
              v-model="userStore.formData.roleTemplateID"
              label="Role Template"
              :errorField="'RoleTemplateID'"
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
          :src="userStore.formData.userImage"
        ></v-img>
        <v-btn
          variant="tonal"
          class="no-uppercase"
          @click="userStore.showImageLoadPopup = true"
          >Resim Yükle / Değiştir</v-btn
        >
      </div>
    </v-col>
  </v-row>

  <!-- IMAGE YÜKLEME POPUP -->
  <my-edit-popup
    :btnloading="userStore.fileLoading"
    width="50%"
    :fullscreen="false"
    v-model="userStore.showImageLoadPopup"
    @close="userStore.showImageLoadPopup = false"
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
import useUserStore from "@/stores/user_store";
let tempFormData = new FormData();
const userStore = useUserStore();
const form = ref();
const nullValueRule = (v) => {
  return !!v || config.requiredMessage;
};

const validateForm = async () => {
  return await form.value.validate();
};

// const editMode = computed(() => {
//   return userStore.formData.ID ? true : false;
// });

/* her resim eklendiğinde ve silindiğinde çalışır ve storu günceller*/
const onValueChangedImage = (e) => {
  console.log(e);
  tempFormData = new FormData();
  tempFormData.append("file", e.value[0]);
  console.log(tempFormData);
};

/* resim ekleme popup ındaki kaydete basınca çalışır */
const saveImageToServer = () => {
  userStore.fileLoading = true;

  userStore.uploadImages(tempFormData).then((res) => {
    console.log(res);
    userStore.formData.userImage = res.data.data.fullPath;
    userStore.showImageLoadPopup = false;
  });

  userStore.fileLoading = false;
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
