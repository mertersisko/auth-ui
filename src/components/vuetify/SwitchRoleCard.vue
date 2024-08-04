<template>
  <v-list-item v-if="!loading">
    <v-row>
      <v-col>
        <v-list-item prepend-icon="mdi-link-box-variant">
          <v-list-item-title>{{ props.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ props.subTitle }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-switch v-model="isShow" color="secondary" label="Görebilir"></v-switch>
      <v-spacer></v-spacer>
      <v-switch
        v-model="isEdit"
        color="secondary"
        label="Görebilir/Düzenleyebilir"
      ></v-switch>
    </v-row>
  </v-list-item>
  <v-progress-linear color="secondary" indeterminate v-else>
  </v-progress-linear>
</template>
<script setup>
import { defineProps, toRef, watch, defineEmits } from "vue";
const isShow = toRef(props.IsShow);
const isEdit = toRef(props.IsEdit);
const pageID = props.PageID;

const props = defineProps({
  title: String,
  subTitle: String,
  IsShow: Boolean,
  IsEdit: Boolean,
  loading: Boolean,
  PageID: Number,
});

const emit = defineEmits(["onChange"]);

watch(isShow, () => {
  if (!isShow.value) isEdit.value = false;

  emit("onChange", { pageID, IsShow: isShow.value, IsEdit: isEdit.value });
});
watch(isEdit, () => {
  if (isEdit.value) isShow.value = true;
  emit("onChange", {
    pageID: pageID,
    IsShow: isShow.value,
    IsEdit: isEdit.value,
  });
});
</script>
