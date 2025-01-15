<template>
  <my-loading-card :model-value="customerStore.loading" />
  <my-custom-card :cardConf="cardConf">
    <template v-slot:content>
      <my-odata-grid
        ref="customerDataGrid"
        :gridConfig="gridConf"
        @newClicked="addNewRecord"
        @gridRowActions="runGridRowAction"
        @rowDblClick="rowDblClick"
      ></my-odata-grid>
    </template>
  </my-custom-card>

  <my-edit-popup
    :fullscreen="false"
    width="60%"
    :btnloading="customerStore.loading"
    v-model="customerStore.popupVisible"
    @close="customerStore.popupVisible = false"
    @save="savePopup"
    :title="title"
  >
    <customer-edit-popup ref="customerPopup" />
  </my-edit-popup>
</template>

<script setup>
import config from "@/config.js";
import { ref, computed } from "vue";
import GridConfig from "@/models/gridConfig";
import CustomerEditPopup from "./CustomerEditPopup.vue";
import useCustomerStore from "@/stores/customer_store";
import { custom } from "devextreme/ui/dialog";

const customerStore = useCustomerStore();
const customerDataGrid = ref(null);
const customerPopup = ref(null);

const cardConf = {
  icon: "mdi-view-dashboard",
  text: "Müşteriler",
};

const title = computed(() =>
  customerStore.formData.ID > 0
    ? "Müşteri : " + customerStore.formData.ShortName
    : "Yeni müşteri"
);

/* grid buton column items */
const gridRowActionsList = [
  { id: 1, name: "Güncelle", icon: "edit", action: "editClicked" },
  { id: 2, name: "Sil", icon: "trash", action: "deleteClicked" },
];

const savePopup = async () => {
  var validation = await customerPopup.value.validateForm();
  if (!validation.valid) return;

  if (customerStore.formData.ID > 0) {
    customerStore.updateCustomer().then((res) => {
      if (res) {
        customerDataGrid.value.refreshDataGrid();
        customerStore.popupVisible = false;
      }
    });
  } else {
    customerStore.createCustomer().then((res) => {
      if (res) {
        customerDataGrid.value.refreshDataGrid();
        customerStore.popupVisible = false;
      }
    });
  }
};

const rowDblClick = (value) => {
  customerStore.getCustomer(value.data.ID);
};

/* Grid yeni butonuna tıklandığında çalışır */
const addNewRecord = () => {
  customerStore.tempDataAuth = [];
  customerStore.formData = {};
  customerStore.popupVisible = true;
};

/* Grid satırlarındaki butonlara tıklandığında çalışır */
const runGridRowAction = (event, value) => {
  if (event.itemData.action === "editClicked") {
    customerStore.getCustomer(value.data.ID);
  } else {
    let myDialog = custom({
      width: "auto",
      title: "Kayıt Silme",
      messageHtml: config.delete_record_message,
      buttons: [
        {
          text: "Evet",
          onClick: () => {
            customerStore.deleteCustomer(value.data.ID).then(() => {
              customerDataGrid.value.refreshDataGrid();
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

const gridConf = computed(() => {
  const fieldList = [
    { dataField: "ID", caption: "Id", visible: false },
    {
      dataField: "FullName",
      caption: "Tam Ad",
      width: "20%",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "ShortName",
      caption: "Kısa Ad",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "AuthName",
      caption: "Sorumlu Adı",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "AuthSurname",
      caption: "Sorumlu Soyad",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "AuthEmail",
      caption: "Sorumlu Email",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "AuthPhoneNumber",
      caption: "Sorumlu Tel",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "WebSite",
      caption: "Web Adress",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "Country",
      caption: "Ülke",
      required: { message: config.requiredMessage },
    },
    {
      dataField: "City",
      caption: "Şehir",
      required: { message: config.requiredMessage },
      hidingPriority:3
    },
    {
      dataField: "District",
      caption: "İlçe",
      required: { message: config.requiredMessage },
      hidingPriority:2
    },
    {
      dataField: "Address",
      caption: "Adres",
      required: { message: config.requiredMessage },
      hidingPriority : 1
    },
    { dataField: "Logo", caption: "Logo", cellTemplate: logoTemplate },
  ];

  const conf = new GridConfig();
  conf.url = "odata/CustomerOdata";
  conf.pkey = "ID";
  conf.pageSize = 10;
  conf.allowAdding = true;
  conf.allowDeleting = false;
  conf.allowUpdating = false;
  conf.exportFileName = "Kullanıcılar";
  conf.fieldList = fieldList;
  conf.gridRowActionList = gridRowActionsList;
  return conf;
});

const logoTemplate = () => {
  return "herhangi bir str";
};
</script>
