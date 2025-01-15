<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-edit-tree-list
        ref="titleGrid"
        :gridConfig="gridConf"
        :root-value="0"
        key-expr="ID"
        parent-id-expr="ParentID"
        :data-source="dataSource"
        @reOrderMethod="updateGrid"
      />
    </template>
  </my-custom-card>
</template>

<script setup>
import { computed, ref } from "vue";
import GridConfig from "@/models/gridConfig";
import config from "@/config.js";
import ODataStore from "devextreme/data/odata/store";
import useTitleStore from "@/stores/title_store";

const titleGrid = ref();
const titleStore = useTitleStore();
const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Title",
};

const updateGrid = (e) => {
  let data = {
    TargetID: e.Target.ID,
    TargetParentID: e.Target.ParentID,
    SourceID: e.Source.ID,
    SourceParentID: e.Source.ParentID,
    IsInside: e.IsInside,
  };
  titleStore.reOrderTitles(data).then(() => {
    titleGrid.value.refreshDataGrid();
  });
};

const gridConf = computed(() => {
  const fieldList = [
    { dataField: "ID", caption: "Id", visible: false, allowEditing: false },
    { dataField: "Name", caption: "Ünvan" , required: { message: "Ünvan alanı zorunludur !" }},
    { dataField: "IndexNumber", visible: false, allowEditing: false },
    {
      dataField: "ParentID",
      visible: false,
      allowEditing: false,
    },
  ];

  const conf = new GridConfig();
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = true;
  conf.allowUpdating = true;
  conf.exportFileName = "Ünvanlar";
  conf.fieldList = fieldList;
  return conf;
});

var dataSource = new ODataStore({
  url: config.odata_api_url + "odata/TitleOData",
  key: "ID",
  keyType: "Int32",
  beforeSend: function (e) {
    if (e.method === "MERGE") e.method = "PATCH";

    if (e.method === "POST")
      e.url = config.odata_api_url + "userdefinations/CreateTitle";

    const token = localStorage.getItem("key");
    e.headers = {
      Authorization: "Bearer " + token,
    };
  },
});
</script>
