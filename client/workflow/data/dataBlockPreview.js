// this page is for displaying captured data, so we return data from persistent storage (the database)
// this page is very similar to formBlockPreivew.js, and could maybe be merged
// but we want to be careful about the pattern

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
  isYesNoBlock:function(){
    if(this.elementType === "yesno"){
      return true;
    }else{
      return false;
    }
  },
  yesNoBlockYesValue: function(){
    if(this.elementType === "yesno"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "yes"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }

    }else{
      return "btn-default";
    }
  },
  yesNoBlockNoValue: function(){
    if(this.elementType === "yesno"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "no"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  },
  isSectionTitle: function(){
    if(this.elementType === "section"){
      return true;
    }else{
      return false;
    }
  },
  getLabelText: function(){
    var resultString = "Q: ";

    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    //console.log('dataRecord', dataRecord);

    if(dataRecord){
        var form = Forms.findOne(dataRecord.schema_id);
        //console.log('getLabelText: form', form);

        if(this.labelText){
            return resultString + this.labelText;
        }else{
            return resultString;
        }
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

    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    //console.log('getInputValue: dataRecord', dataRecord);


    return dataRecord.data[this._id];
  }
});
