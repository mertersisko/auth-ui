export default class GridConfig {
  constructor(
    url,
    pKey,
    pageSize,
    filter,
    allowUpdating,
    allowAdding,
    allowDeleting,
    exportFileName,
    fieldList,
    gridRowActions,
    toolbarAction,
    customAddButton,
    expand
   
  ) {
    this.url = url;
    this.pkey = pKey;
    this.pageSize = pageSize;
    this.filter = filter;
    this.allowUpdating = allowUpdating;
    this.allowAdding = allowAdding;
    this.allowDeleting = allowDeleting;
    this.exportFileName = exportFileName;
    this.fieldList = fieldList;
    this.gridRowActionList = gridRowActions;
    this.toolbarActionList = toolbarAction;
    this.customizeAddButton = customAddButton;
    this.expand =expand;
  }
}
