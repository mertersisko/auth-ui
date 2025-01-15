<template>
  <v-container class="my-3">
    <v-row justify="center">
      <v-col sm="12" md="4" lg="4">
        
        <v-card
          rounded="lg"
          elevation="8"
          outlined
          class="mx-auto"
          min-height="250"
          min-width="100"
          max-width="448"
        >
        <p class="text-blue text-decoration-none text-center">AUTH</p>
          <template v-slot:title>
            <div class="portal-logo">
              <img :src="Icon" />
            </div>
          </template>
          
          <v-card-text>
            
            <v-form @submit.prevent="handleLogin" ref="authForm" v-model="form">
              <simple-text-field
                prepend-inner-icon="mdi-account-outline"
                v-model="authStore.formData.userName"
                label="Kullanıcı Adı"
                :errorField="'UserName'"
                :rules="[(v) => !!v || 'Kullanıcı adı zorunludurr']"
              />

              <simple-text-field
                :type="visible ? 'text' : 'password'"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                prepend-inner-icon="mdi-lock-outline"
                v-model="authStore.formData.password"
                label="Parola"
                :errorField="'Password'"
                @click:append-inner="visible = !visible"
                :rules="[(v) => !!v || 'Şifre zorunludur']"
              />

              <v-btn
                block
                class="mb-8"
                color="blue"
                size="large"
                variant="tonal"
                @click="handleLogin"
                :loading="authStore.loading"
                type="submit"
               
              >
                LOG IN
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Şifremi unuttum <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from "@/router";
import useAuthStore from "@/stores/auth_store";
import useErrorHandler from "@/stores/error_hander_store";
import Icon from "@/assets/icon.png";
import { ref } from "vue";
const authStore = useAuthStore();
const errorStore = useErrorHandler();
const authForm = ref();
let visible = ref(false);
let form = ref(false);

const handleLogin = async () => {
  errorStore.formErrors = {};
  if (!form.value) return;
 
  let validation = await authForm.value.validate();
  if (!validation.valid) return;

  authStore.login().then((response) => {
    if (response) {
      authStore.formData = {};
      router.push("/home");
    } else {
      console.log("ssss");
    }
  });
};
</script>
<style scoped>
.portal-logo {
  padding: 15px;
  text-align: center;
  margin: 60px auto 20px auto;
}

:v-deep .button-indicator {
  height: 32px;
  width: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
