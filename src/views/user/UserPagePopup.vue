<template>
  <v-list nav>
    <template v-for="page in userStore.pageTemplateList" :key="page.id">
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
            :loading="userStore.loading"
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
import useUserStore from "@/stores/user_store";
const userStore = useUserStore();

const getChildPages = (parentID) => {
  return userStore.pageTemplateList.filter(
    (page) => page.parentID === parentID
  );
};

const updateTree = (e) => {
  e.ParentID = userStore.selectedUserId;
  userStore.createPageTemplate(e);
};
</script>
