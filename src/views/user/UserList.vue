<template>
  <my-loading-card :model-value="userStore.loading" />
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-odata-grid
        ref="userDataGrid"
        :gridConfig="gridConf"
        @newClicked="addNewRecord"
        :data-source="dataSource"
        :remote-operations="false"
        @gridRowActions="runGridRowAction"
        @rowDblClick="rowDblClick"
      ></my-odata-grid>
    </template>
  </my-custom-card>

  <my-edit-popup
    :fullscreen="false"
    width="80%"
    :btnloading="userStore.loading"
    v-model="userStore.showEditPopup"
    @close="userStore.showEditPopup = false"
    @save="savePopup"
    :title="title"
  >
    <user-edit-popup ref="userPopup" />
  </my-edit-popup>

  <my-simple-popup
    width="60%"
    title="Kullanıcı Rol Şablonu"
    v-model="userStore.showRolePopup"
    @close="userStore.showRolePopup = false"
  >
    <user-page-popup />
  </my-simple-popup>
</template>

<script setup>
import config from "@/config.js";
import { ref, computed } from "vue";
import GridConfig from "@/models/gridConfig";
import UserEditPopup from "./UserEditPopup.vue";
import UserPagePopup from "./UserPagePopup.vue";
import useUserStore from "@/stores/user_store";
import { custom } from "devextreme/ui/dialog";
import { createStore } from "devextreme-aspnet-data-nojquery";

const userStore = useUserStore();
const userDataGrid = ref(null);
const userPopup = ref(null);

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Kullanıcılar",
};

const title = computed(() =>
  userStore.formData.id > 0
    ? `Kullanıcı : ${userStore.formData.name} ${userStore.formData.surname}`
    : "Yeni kullanıcı"
);

/* grid buton column items */
const gridRowActionsList = [
  { id: 1, name: "Güncelle", icon: "edit", action: "editClicked" },
  { id: 2, name: "Sil", icon: "trash", action: "deleteClicked" },
  { id: 3, name: "Roller", icon: "key", action: "showRolePopup" },
];

const savePopup = async () => {
  var validation = await userPopup.value.validateForm();
  if (!validation.valid) return;

  if (userStore.formData.id > 0) {
    userStore.updateUser().then((res) => {
      if (res) {
        userDataGrid.value.refreshDataGrid();
        userStore.showEditPopup = false;
      }
    });
  } else {
    userStore.createuser().then((res) => {
      if (res) {
        userDataGrid.value.refreshDataGrid();
        userStore.showEditPopup = false;
      }
    });
  }
};

const rowDblClick = (value) => {
  userStore.getUser(value.data.id);
};

/* Grid yeni butonuna tıklandığında çalışır */
const addNewRecord = () => {
  userStore.tempDataAuth = [];
  userStore.formData = {};
  userStore.showEditPopup = true;
};

/* Grid satırlarındaki butonlara tıklandığında çalışır */
const runGridRowAction = (event, value) => {
  if (event.itemData.action === "editClicked") {
    userStore.getUser(value.data.id);
  } else if (event.itemData.action === "showRolePopup") {
    userStore.getRoles(value.data.id);
  } else {
    let myDialog = custom({
      width: "auto",
      title: "Kayıt Silme",
      messageHtml: config.delete_record_message,
      buttons: [
        {
          text: "Evet",
          onClick: () => {
            userStore.deleteUser(value.data.is).then(() => {
              userDataGrid.value.refreshDataGrid();
            });
          },
        },
        {
          text: "Hayır",
          onClick: () => {
            return;
          },
        },
      ],
    });

    myDialog.show();
  }
};

const dataSource = createStore({
  key: "id",
  loadUrl: `${config.odata_api_url}user/getuserlist`,

  onBeforeSend: (method, ajaxOptions) => {
    const token = localStorage.getItem("key");
    ajaxOptions.headers = {
      withCredentials: true,
      Authorization: "Bearer " + token,
    };
  },
  onAjaxError: (error) => {
    console.log(error);
  },
});

const gridConf = computed(() => {
  const fieldList = [
    { dataField: "id", caption: "ID", visible: false, allowEditing: false },
    { dataField: "userName", caption: "Kullanıcı Kodu" },
    { dataField: "name", caption: "Adı" },
    { dataField: "surname", caption: "Soyadı" },
    { dataField: "email", caption: "Email" },
    {
      dataField: "userStatus",
      caption: "Durum",
      allowEditing: false,

      lookup: {
        dataSource: config.userStatus,
        displayField: "name",
        valueField: "id",
      },
    },
  ];

  const conf = new GridConfig();
  conf.pkey = "id";
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = false;
  conf.allowUpdating = false;
  conf.exportFileName = "Kullanıcılar";
  conf.fieldList = fieldList;
  conf.gridRowActionList = gridRowActionsList;

  return conf;
});
</script>
