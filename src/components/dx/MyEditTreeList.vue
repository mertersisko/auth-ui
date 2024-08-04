<template>
  <DxTreeList
    ref="treegrid"
    v-bind="attrs"
    :show-row-lines="true"
    :show-borders="true"
    :column-auto-width="true"
    :row-alternation-enabled="true"
    :column-hiding-enabled="true"
    @row-updating="onRowUpdating"
    @row-prepared="gridRowPrepared"
    @initialized="createGridIntance"
  >
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

    <DxEditing
      :use-icons="true"
      :allow-adding="true"
      :allow-updating="true"
      :allow-deleting="true"
      mode="batch"
    />

    <DxToolbar>
      <DxItem location="after" name="searchPanel" locate-in-menu="auto" />
      <DxItem location="after" name="saveButton" locate-in-menu="auto" />
      <DxItem location="after" name="revertButton" locate-in-menu="auto" />
      <DxItem
        locate-in-menu="auto"
        location="after"
        template="addNewTemplate"
        :visible="true"
      />

      <DxItem
        location="after"
        template="refreshTemplate"
        locate-in-menu="auto"
      />
    </DxToolbar>

    <template #refreshTemplate>
      <DxButton icon="refresh" @click="refreshDataGrid" type="normal" />
    </template>

    <template #addNewTemplate>
      <DxButton icon="add" @click="openNewAction" type="normal" />
    </template>

    <DxFilterRow :visible="showFilterRow" />
    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />

    <DxRowDragging
      :on-drag-change="onDragChange"
      :on-reorder="onReorder"
      :allow-drop-inside-item="true"
      :allow-reordering="true"
      :show-drag-icons="true"
    />

    <DxPaging :page-size="gConf.pageSize" />
    <DxPager
      :visible="true"
      allowed-page-sizes="[10, 30, 50, 0]"
      display-mode="full"
      :show-page-size-selector="true"
      :show-info="true"
      :show-navigation-buttons="true"
    />
  </DxTreeList>
</template>
<script setup>
import {
  DxTreeList,
  DxColumn,
  DxRowDragging,
  DxEditing,
  DxRequiredRule,
  DxPatternRule,
  DxEmailRule,
  DxPaging,
  DxPager,
  DxLookup,
  DxFilterRow,
  DxToolbar,
  DxItem,
  DxSearchPanel,
} from "devextreme-vue/tree-list";
import {
  defineProps,
  computed,
  useAttrs,
  ref,
  defineExpose,
  defineEmits,
} from "vue";
import { DxButton } from "devextreme-vue/button";
const emits = defineEmits(["reOrderMethod"]);
let gridInit = null;
const showFilterRow = ref(true);
const a = defineProps(["gridConfig"]);
const gConf = computed(() => a.gridConfig);
const attrs = useAttrs();

const createGridIntance = (e) => {
  gridInit = e.component;
};

const onDragChange = (e) => {
  const visibleRows = e.component.getVisibleRows();
  const sourceNode = e.component.getNodeByKey(e.itemData.ID);
  let targetNode = visibleRows[e.toIndex].node;

  while (targetNode && targetNode.data) {
    if (targetNode.data.ID === sourceNode.data.ID) {
      e.cancel = true;
      break;
    }
    targetNode = targetNode.parent;
  }
};

const onReorder = (e) => {
  console.log(e);
  const visibleRows = e.component.getVisibleRows();
  let targetData = {};
  let sourceData = {};

  if (e.dropInsideItem) {
    sourceData = e.itemData;
    const toIndex = e.fromIndex > e.toIndex ? e.toIndex : e.toIndex;
    targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;
  } else {
    sourceData = e.itemData;
    const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
    targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;
  }



  let data = {
    Target : targetData,
    Source : sourceData,
    IsInside :e.dropInsideItem
  }

  emits("reOrderMethod", data);
};

const gridRowPrepared = (e) => {
  if (e.rowType == "header") e.rowElement.bgColor = "#EEEEEE";
};

const onRowUpdating = (options) => {
  options.newData = { ...options.oldData, ...options.newData };
};

const refreshDataGrid = () => {
  gridInit.refresh();
};

const openNewAction = () => {
  gridInit.addRow();
};

defineExpose({
  refreshDataGrid,
});
</script>
<style scoped>

::v-deep .dx-link 
{
  color: #333333 !important;
}
/* ::v-deep .row-action-btn .dx-buttongroup-item.dx-button-mode-outlined.dx-button {
  background-color: transparent;
  border: 0px !important;
} */



</style>
