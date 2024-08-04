
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import MyOdataGrid from "@/components/dx/MyOdataGrid"
import MyEditGrid from "@/components/dx/MyEditGrid"
import MyCustomCard from "@/components/vuetify/MyCustomCard";
import MyEditPopup from "@/components/vuetify/MyEditPopup";
import MySimplePopup from "@/components/vuetify/MySimplePopup.vue";
import MyLoadingCard from "@/components/vuetify/MyLoadingCard";
import MyDxFileUploader from "@/components/dx/MyDxFileUploader.vue";
import MyEditTreeList from "@/components/dx/MyEditTreeList.vue";
import ImageList from "@/components/vuetify/ImageList.vue";


import SimpleTextField from "@/components/vuetify/SimpleTextField.vue";
import SimpleSelectField from "@/components/vuetify/SimpleSelectField.vue";
import SimpleNumberField from "@/components/vuetify/SimpleNumberField.vue";
import SwitchRoleCard from "@/components/vuetify/SwitchRoleCard.vue"


export function registerPlugins (app) {
 
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .component('MyCustomCard', MyCustomCard)
    .component('MyOdataGrid', MyOdataGrid)
    .component('MyEditGrid', MyEditGrid)
    .component('MyEditPopup', MyEditPopup)
    .component('MySimplePopup', MySimplePopup)
    .component('MyLoadingCard', MyLoadingCard)
    .component('MyDxFileUploader', MyDxFileUploader)
    .component('MyEditTreeList', MyEditTreeList)
    .component('ImageList', ImageList)
    .component('SimpleTextField', SimpleTextField)
    .component('SimpleSelectField', SimpleSelectField)
    .component('SimpleNumberField', SimpleNumberField)
    .component('SwitchRoleCard', SwitchRoleCard)

    
}