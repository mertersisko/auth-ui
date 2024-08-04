<template>
  <DxTreeView
    color="#e5e5e5"
    :search-enabled="true"
    :search-mode="searchMode"
    id="simple-treeview"
    :items="menuList"
    width="auto"
    height="auto"
    data-structure="plain"
    parent-id-expr="categoryId"
    key-expr="ID"
    display-expr="name"
    @item-click="selectItem"
  >
  
  <DxSearchEditorOptions
            placeholder="Menüde ara.."
        />
  </DxTreeView>
</template>

<script setup>
import { useRouter } from "vue-router";
import DxTreeView, {
    DxSearchEditorOptions
} from 'devextreme-vue/tree-view';
const router = useRouter();
const searchMode = "contains";

function selectItem(e) {
  if (e.itemData.link) router.push("/" + e.itemData.link);
  else {
    if (e.node.expanded) e.component.collapseItem(e.node.key);
    else e.component.expandItem(e.node.key);
  }
}

const menuList = [
  {
    ID: "1",
    name: "Anasayfa",
    link: "home",
  },
 
  {
    ID: "2",
    name: "Müşteri Bilgileri",
    link: "customer",
  },
  {
    ID: "3",
    name: "Departmanlar",
    link: "department",
  },
  {
    ID: "4",
    name: "Ünvanlar",
    link: "title",
  },

  {
    ID: "5",
    name: "Kullanıcı Listesi",
    link: "user",
  },
  {
    ID: "6",
    name: "Sayfalar",
    link: "pagelist",
  },
  {
    ID: "7",
    name: "Roller",
    link: "role-template",
  },
 
];
</script>
<style scoped>
:deep .dx-treeview-toggle-item-visibility {
  color: #fff !important;
}

#simple-treeview {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
  margin: 5px !important;
  color: #fff !important;
}

:deep .dx-treeview-item.dx-state-hover {
  color: #fff !important;
  background-color: #454d54 !important;
}
</style>
