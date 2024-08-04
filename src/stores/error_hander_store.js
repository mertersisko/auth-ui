import { defineStore } from "pinia";

export default defineStore("errorHandler", {
  state: () => ({
    formErrors:{},
    messages:[],
    showMessageState:false,
    showFormErorros:false,
  }),
  getters: {

  },
  actions: {
    showMessage(messag){
        this.messages=messag;
        this.showMessageState=true;
    },
    hideMessage(){
        this.showMessage=false;
    },
    prepareApiError(datas){     
        if(Array.isArray(datas)){
            for (let index = 0; index < datas.length; index++) {
                const message = datas[index];
                this.formErrors[message.key]=message.values
            }
            console.log(this.formErrors)
            /* AK tarafından eklendi !*/
           // this.showMessage(this.formErrors);
            
        }else{
          console.log(datas)
            this.showMessage(datas.Values);
        }
    },
    getFormErrors(key){
      if(this.formErrors[key]){
        return this.formErrors[key]
      }else{
        return []
      }
    },
    anyErrors(key){
      if(this.formErrors[key]){
        return this.formErrors[key].length>0
      }
      return false;
      
    }
  },
});
