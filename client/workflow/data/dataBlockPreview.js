Template.dataBlockPreview.helpers({
  isInput: function(){
    if(this.elementType === "input"){
      return true;
    }else{
      return false;
    }
  },
  isTextarea: function(){
    if(this.elementType === "textarea"){
      return true;
    }else{
      return false;
    }
  },
  getLabelText: function(){
    var resultString = "Q: ";

    var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
    console.log('dataRecord', dataRecord);

    var form = Forms.findOne(dataRecord.schema_id);
    console.log('getLabelText: form', form);

    if(this.labelText){
        return resultString + this.labelText;
    }else{
        return resultString;
    }
  },
  getInputType: function(){
    return this.inputType;
  },
  getInputPlaceholder: function(){
    if(this.inputPlaceholder){
      return this.inputPlaceholder;
    }else{
      return "...";
    }
  },
  getInputValue: function(){

    var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
    console.log('getInputValue: dataRecord', dataRecord);


    return dataRecord.data[this._id];
  }
});
