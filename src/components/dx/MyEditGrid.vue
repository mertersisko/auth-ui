<template>
  <!-- gConf.dataSource API ayağa kalkınca Bu Datasource test olarak eklendi -->
  <DxDataGrid
    :auto-width="true"
    :show-borders="true"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :column-auto-width="true"
    :row-alternation-enabled="true"
    :show-row-lines="true"
    :selection="{ mode: 'single' }"
    :column-hiding-enabled="true"
    :word-wrap-enabled="false"
    v-bind="attrs"
    :grouping="{
      allowCollapsing: true,
      autoExpandAll: true,
      contextMenuEnabled: false,
      expandMode: 'buttonClick',
    }"
    :groupPanel="{
      allowColumnDragging: true,
      visible: true,
    }"
    :remoteOperations="{
      filtering: true,
      paging: true,
      grouping: false,
      sorting: true,
      summary: false,
      groupPaging: false,
    }"
    @row-prepared="gridRowPrepared"
    @initialized="createGridIntance"
    @exporting="onExporting"
    @row-updating="onRowUpdating"
  >
    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
    <DxColumnFixing :enabled="true" />
    <DxFilterRow :visible="showFilterRow" />

    <!-- Columns -->

    <DxColumn
      v-for="c in gConf.fieldList"
      :key="c.dataField"
      :data-field="c.dataField"
      :visible="c.visible"
      :caption="c.caption"
      :data-type="c.dataType"
      :hiding-priority="c.hidingPriority"
      :sort-order="c.sortorder"
      :format="c.format"
      :width="c.width"
      :allow-editing="c.allowEditing"
      :show-in-column-chooser="c.showInColumnChooser"
    >
      <!-- buradaki data source gerekli durumda paging yapılabilir -->
      <DxLookup
        v-if="c.lookup"
        :data-source="c.lookup.dataSource"
        :display-expr="c.lookup.displayField"
        :value-expr="c.lookup.valueField"
        :show-clearbutton="c.lookup.showClearButton"
      />
      <DxRequiredRule v-if="c.required" :message="c.required.message" />
      <DxPatternRule
        v-if="c.pattern"
        :pattern="c.pattern?.pattern"
        :message="c.pattern?.message"
      />
      <DxEmailRule v-if="c.isEmail" message="Geçersiz Email adresi" />
    </DxColumn>

    <!-- Update Delete button -->

    <DxColumn
      v-if="gConf.allowUpdating || gConf.allowDeleteting"
      type="buttons"
      :width="65"
      :fixed="true"
      fixed-position="right"
      :show-in-column-chooser="false"
    >
      <DxCommandButton hint="Kaydet" name="save" icon="save" />
      <DxCommandButton hint="Güncelle" name="edit" icon="edit" />
      <DxCommandButton hint="İptal" name="cancel" icon="undo" />
      <DxCommandButton hint="Sil" name="delete" icon="trash" />
    </DxColumn>

    <!-- Row Actions -->

    <DxColumn
      :show-in-column-chooser="false"
      v-if="gConf.gridRowActionList"
      width="65"
      :allow-sorting="false"
      :fixed="true"
      fixed-position="right"
      cell-template="actionCellTemplate"
    />

    <template #actionCellTemplate="{ data }">
      <DxDropDownButton
        :dropDownOptions="gridDropDownOptions"
        height="15"
        :element-attr="dropDownButtonAttributes"
        :split-button="false"
        :use-select-mode="false"
        :use-popover="true"
        :items="gConf.gridRowActionList"
        icon="preferences"
        display-expr="name"
        key-expr="id"
        @item-click="runGridRowAction($event, data)"
      />
    </template>

    <!-- Summary -->

    <DxSummary>
      <template v-for="c in gConf.fieldList" :key="c.dataField">
        <DxTotalItem
          v-if="c.showSummary"
          :column="c.dataField"
          :summary-type="c.summaryType"
        />
      </template>
    </DxSummary>

    <!-- Editing -->
    <DxEditing
      :use-icons="true"
      mode="row"
      :allow-updating="gConf.allowUpdating"
      :allow-deleting="gConf.allowDeleting"
      :allow-adding="gConf.allowAdding"
    />
    <!-- Paging -->

    <DxPaging :page-size="gConf.pageSize" />
    <DxPager
      :visible="true"
      :allowed-page-sizes="pageSizes"
      :display-mode="displayMode"
      :show-page-size-selector="showPageSizeSelector"
      :show-info="showInfo"
      :show-navigation-buttons="showNavButtons"
    />

    <!-- Toolbar -->
    <DxExport :enabled="true" :allow-export-selected-data="true" />
    <DxColumnChooser :enabled="true" mode="select" />

    <DxToolbar>
      <DxItem location="before" name="groupPanel" locate-in-menu="auto" />
      <DxItem location="after" name="searchPanel" locate-in-menu="auto" />
      <DxItem
        locate-in-menu="auto"
        location="after"
        template="addNewTemplate"
        :visible="gConf.allowAdding"
      />
      <DxItem
        location="after"
        name="columnChooserButton"
        locate-in-menu="auto"
      />
      <DxItem
        location="after"
        template="refreshTemplate"
        locate-in-menu="auto"
      />
      <DxItem
        location="after"
        template="headerFilterTemplate"
        locate-in-menu="auto"
      />
      <DxItem lacation="after" name="exportButton" locate-in-menu="auto" />
      <DxItem
        locate-in-menu="auto"
        lacation="after"
        template="toolbarActionTemplate"
        v-if="gConf.toolbarActionList"
      />
    </DxToolbar>

    <template #refreshTemplate>
      <DxButton icon="refresh" @click="refreshDataGrid" type="normal" />
    </template>

    <template #addNewTemplate>
      <DxButton icon="add" @click="openNewAction" type="normal" />
    </template>

    <template #headerFilterTemplate>
      <DxButton
        icon="filter"
        @click="() => (showFilterRow = !showFilterRow)"
        type="normal"
      />
    </template>

    <template #toolbarActionTemplate>
      <DxDropDownButton
        :dropDownOptions="toolbarDropDownOptions"
        text="İşlemler"
        width="auto"
        icon="runner"
        @item-click="runToolbarAction($event)"
        :items="gConf.toolbarActionList"
      />
    </template>
  </DxDataGrid>
</template>

<script setup>
import "devextreme/data/odata/store";
import { DxButton } from "devextreme-vue/button";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import { EdmLiteral, keyConverters } from "devextreme/data/odata/utils";

import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxColumnChooser,
  DxColumnFixing,
  DxExport,
  DxToolbar,
  DxItem,
  DxSummary,
  DxTotalItem,
  DxEditing,
  DxLookup,
  DxRequiredRule,
  DxPatternRule,
  DxSearchPanel,
  DxEmailRule,
  DxButton as DxCommandButton,
} from "devextreme-vue/data-grid";
import {
  defineProps,
  onMounted,
  defineEmits,
  ref,
  defineExpose,
  computed,
  useAttrs,
} from "vue";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";

const attrs = useAttrs();
const displayMode = "full";
const pageSizes = [10, 30, 50, 0];
const showPageSizeSelector = true;
const showInfo = true;
const showNavButtons = true;
const showFilterRow = ref(true);
const gridDropDownOptions = { width: 200 };
const toolbarDropDownOptions = { width: 200 };
const dropDownButtonAttributes = { class: "row-action-btn" };

let gridInit = null;

const a = defineProps(["gridConfig"]);

const gConf = computed(() => a.gridConfig);

const emits = defineEmits(["gridRowActions", "toolbarActions", "addCustomNew"]);

/********************************************/
/* EXCEL EXPORT  */
/********************************************/

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("DataSheet");
  const fileName = gConf.value.exportFileName + ".xlsx";

  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
  }).then(function () {
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        fileName
      );
    });
  });
  e.cancel = true;
};

/********************************************/
/* EMITS */
/********************************************/

const runGridRowAction = (event, data) => {
  emits("gridRowActions", event, data);
};

const runToolbarAction = (event) => {
  emits("toolbarActions", event.itemData.action);
};

/********************************************/
/* FUNCTIONS */
/********************************************/

const openNewAction = () => {
  if (gConf.value.customizeAddButton) emits("addCustomNew");
  else gridInit.addRow();
};

const createGridIntance = (e) => {
  gridInit = e.component;
};

const refreshDataGrid = () => {
  gridInit.refresh();
};

const gridRowPrepared = (e) => {
  if (e.rowType == "header") e.rowElement.bgColor = "#EEEEEE";
};

const onRowUpdating = (options) => {
  options.newData = { ...options.oldData, ...options.newData };
};

const getData = () => {
  return gridInit.getDataSource().items();
};

onMounted(() => {
  keyConverters["Date"] = function (value) {
    return new EdmLiteral(value.toJSON());
  };
});

defineExpose({
  refreshDataGrid,
  getData,
});
</script>

<style scoped>
::v-deep .row-action-btn .dx-buttongroup-item.dx-button-mode-outlined.dx-button {
  background-color: transparent;
  border: 0px !important;
}

/* satırdaki menünün blok halinde gözükmesi için*/
::v-deep .dx-dropdownbutton-content .dx-list-item {
  display: block !important;
}

::v-deep .dx-datagrid .dx-link {
  color: #333333 !important;
}
</style>

<!-- 

    filed property list
    --------------------------------

    dataField : string
    dataType : string
    caption :string
    visible : boolean
    sortOrder : string
    hidingPriority : int
    format : string
    width : int
    showInColumnChooser: boolean
    showSummary : boolean
    summaryType : string


-->
