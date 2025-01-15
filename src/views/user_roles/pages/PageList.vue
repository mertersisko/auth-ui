<template>
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-edit-tree-list
        ref="pageListGrid"
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
import usePageStore from "@/stores/page_store";

const pageStore = usePageStore();
const pageListGrid = ref();

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Sayfalar",
};

const updateGrid = (e) => {
  let data = {
    TargetID: e.Target.ID,
    TargetParentID: e.Target.ParentID,
    SourceID: e.Source.ID,
    SourceParentID: e.Source.ParentID,
    IsInside: e.IsInside,
  };
  pageStore.reOrderPages(data).then(() => {
    pageListGrid.value.refreshDataGrid();
  });
};

//--gridCongigs--
const gridConf = computed(() => {
  const fieldList = [
    { dataField: "ID", caption: "Id", visible: false },
    { dataField: "ParentID", caption: "ParentID", visible: false },
    { dataField: "IndexNumber", caption: "Index", visible: false },
    {
      dataField: "Name",
      caption: "Sayfa Adı",
      required: { message: "Sayfa Adı alanı zorunludur !" },
    },
    {
      dataField: "Desc",
      caption: "Açıklama",
      required: { message: "Açıklama alanı zorunludur !" },
    },
    { dataField: "Url", caption: "URL" },
    {
      dataField: "ProjectName",
      caption: "Proje",
      required: { message: "Proje alanı zorunludur !" },
    },
  ];

  const conf = new GridConfig();
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = true;
  conf.allowUpdating = true;
  conf.exportFileName = "Müşteriler";
  conf.fieldList = fieldList;
  return conf;
});

//data girdsource
var dataSource = new ODataStore({
  url: config.odata_api_url + "odata/PageOData",
  key: "ID",
  keyType: "Int32",
  beforeSend: function (e) {
    if (e.method === "POST") {
      e.url = e.url.replace("odata/", "");
    }
    const token = localStorage.getItem("key");
    e.headers = {
      Authorization: "Bearer " + token,
    };
  },
});
</script>
