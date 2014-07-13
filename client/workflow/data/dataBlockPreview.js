// this page is for displaying captured data, so we return data from persistent storage (the database)
// this page is very similar to formBlockPreivew.js, and could maybe be merged
// but we want to be careful about the pattern

Template.dataBlockPreview.events({
  'click .item':function(){
    Session.set('activeQuestion', this._id);
  }
});


Template.dataBlockPreview.helpers({
  isSpacer: function(){
    if(this.elementType === "spacer"){
      return true;
    }else{
      return false;
    }
  },
  isTextBlock: function(){
    if(this.elementType === "plaintext"){
      return true;
    }else{
      return false;
    }
  },
  isRadioBlock: function(){
    if(this.elementType === "radio"){
      return true;
    }else{
      return false;
    }
  },
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
    var resultString = "";

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
    return dataRecord.data[this._id];
  },

  getValueActive1: function(){
    if(this.elementType === "radio"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "1"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive2: function(){
    if(this.elementType === "radio"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "2"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive3: function(){
    if(this.elementType === "radio"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "3"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive4: function(){
    if(this.elementType === "radio"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "4"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive5: function(){
    if(this.elementType === "radio"){
      var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
      console.log('getInputValue: dataRecord', dataRecord);
      console.log('this._id', this._id);

      if(dataRecord){
        if(dataRecord.data[this._id] === "5"){
          return "btn-info";
        }else{
          return "btn-default";
        }
      }
    }else{
      return "btn-default";
    }
  }
});
