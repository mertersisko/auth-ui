<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-edit-tree-list
        ref="deptGrid"
        :gridConfig="gridConf"
        :root-value="0"
        key-expr="ID"
        parent-id-expr="ParentDepartmentId"
        :data-source="dataSource"
        @reOrderMethod="updateGrid"
      />
    </template>
  </my-custom-card>
</template>
<script setup>
import { computed, ref, onBeforeMount } from "vue";
import GridConfig from "@/models/gridConfig";
import config from "@/config.js";
import ODataStore from "devextreme/data/odata/store";
import useUserStore from "@/stores/user_store";
import useDepartmentStore from "@/stores/department_store";

const userStore = useUserStore();
const departmentStore = useDepartmentStore();
const deptGrid = ref();

onBeforeMount(() => {
  userStore.fillUserLookup();
});

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Departmanlar",
};

const updateGrid = (e) => {
  let data = {
    TargetID: e.Target.ID,
    TargetParentID: e.Target.ParentID,
    SourceID: e.Source.ID,
    SourceParentID: e.Source.ParentID,
    IsInside: e.IsInside,
  };
  departmentStore.reOrderDepartments(data).then(() => {
    deptGrid.value.refreshDataGrid();
  });
};

const gridConf = computed(() => {
  const fieldList = [
    { dataField: "ID", caption: "Id", visible: false, allowEditing: false },
    { dataField: "Name", caption: "Departman" , required: { message: "Departman alanı zorunludur !"}},
    { dataField: "ParentDepartmentId", visible: false, allowEditing: false },
    { dataField: "IndexNumber", visible: false, allowEditing: false },
    {
      dataField: "AuthUserID",
      caption: "Sorumlu",
      lookup: {
        dataSource: userStore.userList,
        displayField: "name",
        valueField: "id",
        showClearButton: true,
      },
    },
  ];

  const conf = new GridConfig();
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = true;
  conf.allowUpdating = true;
  conf.exportFileName = "Departmanlar";
  conf.fieldList = fieldList;
  return conf;
});

//data girdsource
var dataSource = new ODataStore({
  url: config.odata_api_url + "odata/DepartmentOData",
  key: "ID",
  keyType: "Int32",
  beforeSend: (e) => {
    if (e.method === "MERGE") e.method = "PATCH";

    if (e.method === "POST")
      e.url = config.odata_api_url + "userdefinations/CreateDepartment";

    const token = localStorage.getItem("key");
    e.headers = {
      Authorization: "Bearer " + token,
    };
    console.log(e);
  },
});
</script>
