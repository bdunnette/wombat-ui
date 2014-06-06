// this page is for capturing data, so we any data that is returned is what is stored in the current Session
// this page is very similar to dataBlockPreivew.js, and could maybe be merged
// but we want to be careful about the pattern

Template.formBlockPreview.helpers({
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
  isSpacer: function(){
    if(this.elementType === "spacer"){
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
    if(Session.get('item-' + this._id + '-yesno')){
      if(Session.get('item-' + this._id + '-yesno') == 'yes'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  yesNoBlockNoValue: function(){
    if(Session.get('item-' + this._id + '-yesno')){
      if(Session.get('item-' + this._id + '-yesno') == 'no'){
        return "btn-info";
      }else{
        return "btn-default";
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
    return this.inputValue;
  },
  getJson: function(){
    return JSON.stringify(this);
  }
});



Template.formBlockPreview.events({
  'click .yes-button':function(){
    //Session.set('selectedBlockItem', this._id);
    Session.set('item-' + this._id + '-yesno', 'yes');
    // alert('yes: ' + this._id);
  },
  'click .no-button':function(){
    //Session.set('selectedBlockItem', this._id);
    Session.set('item-' + this._id + '-yesno', 'no');
    // alert('no: ' + this._id);
  },
});
