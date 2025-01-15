<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-edit-grid
        ref="roleTemplateGrid"
        :gridConfig="gridConf"
        :data-source="dataSource"
        @gridRowActions="runGridRowActions"
        @rowDblClick="rowDblClick"
      />
    </template>
  </my-custom-card>

  <my-simple-popup
    width="60%"
    title="Role Şablonu"
    v-model="roleTemplateStore.showTemplatePopup"
    @close="roleTemplateStore.showTemplatePopup = false"
  >
    <role-template-edit> </role-template-edit>
  </my-simple-popup>
</template>
<script setup>
import { computed } from "vue";
import GridConfig from "@/models/gridConfig";
import config from "@/config.js";
import notify from "devextreme/ui/notify";
import useRoleTemplateStore from "@/stores/role_template_store";
import RoleTemplateEdit from "./RoleTemplateEdit.vue";
const roleTemplateStore = useRoleTemplateStore();

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Rol Template",
};

const rowDblClick = (data) => {
  roleTemplateStore.selectedRoleTemplate = data.data;
  roleTemplateStore.getRoleTemplate(data.data.ID);
  roleTemplateStore.showTemplatePopup = true;
};

const actList = [
  {
    id: 1,
    name: "Detay",
    icon: "edit",
    action: "showDetail",
  },
];

const runGridRowActions = (event, data) => {
  if (event.itemData.action == "showDetail") {
    roleTemplateStore.selectedRoleTemplate = data.data;
    roleTemplateStore.getRoleTemplate(data.data.ID);
    roleTemplateStore.showTemplatePopup = true;
  }
};

const gridConf = computed(() => {
  const fieldList = [
    { dataField: "ID", caption: "Id", visible: false },
    { dataField: "Name", caption: "Rol" },
    { dataField: "Desc", caption: "Açıklama" },
  ];

  const conf = new GridConfig();
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = true;
  conf.allowUpdating = true;
  conf.exportFileName = "Rol Template";
  conf.fieldList = fieldList;
  conf.gridRowActionList = actList;

  return conf;
});

const dataSource = {
  store: {
    type: "odata",
    url: config.odata_api_url + "odata/RoleTemplateOData",
    key: "ID",
    version: 4,
    beforeSend: function (e) {
      if (e.method === "POST") {
        e.url = e.url.replace("odata/", "");
      }

      const token = localStorage.getItem("key");
      e.headers = {
        Authorization: "Bearer " + token,
      };
    },
    errorHandler: (error) => {
      notify(error, "warning", 2000);
    },
  },
};

//data girdsource
// var dataSource = new ODataStore({
//   url: config.odata_api_url + "odata/RoleTemplateOData",
//   key: "ID",
//   keyType: "Int32",
//   beforeSend: function (e) {

//     if (e.method === "POST") {
//             e.url = e.url.replace("odata/", "");
//           }
//     const token = localStorage.getItem("key");
//     e.headers = {
//       Authorization: "Bearer " + token,
//     };
//     console.log(e)
//   },
//   errorHandler: (error) => {
//       notify(error, "warning", 2000);
//     },
// });
</script>
