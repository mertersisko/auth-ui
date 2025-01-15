<template>
  <v-list nav>
    <template v-for="page in roleTemplateStore.roleTemplateData" :key="page.id">
      <v-list-group
        v-if="page.parentID === 0"
        :key="page.id"
        no-action
        color="blue"
        prepend-icon="mdi-menu"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title>{{ page.pageName }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list dense>
          <switch-role-card
            :title="childPage.pageName"
            :loading="roleTemplateStore.loading"
            :subTitle="childPage.url"
            v-for="childPage in getChildPages(page.id)"
            :key="childPage.id"
            :IsShow="childPage.isShow"
            :IsEdit="childPage.isEdit"
            :PageID="childPage.id"
            @onChange="updateTree"
          >
          </switch-role-card>
        </v-list>
      </v-list-group>
    </template>
  </v-list>
</template>

<script setup>
import useRoleTemplateStore from "@/stores/role_template_store";
const roleTemplateStore = useRoleTemplateStore();

const getChildPages = (parentID) => {
  return roleTemplateStore.roleTemplateData.filter(
    (page) => page.parentID === parentID
  );
};

const updateTree = (e) => {
  e.ParentID = roleTemplateStore.selectedRoleTemplate.ID;
  roleTemplateStore.createRoleTemplate(e);
};
</script>
