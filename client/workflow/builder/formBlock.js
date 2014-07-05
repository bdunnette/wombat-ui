
Template.formBlock.helpers({
  isSelected: function(){
    if(Session.get('selectedBlockItem') === this._id){
      return "selected"
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
  isDateTimeBlock:function(){
    if(this.elementType === "datetime"){
      return true;
    }else{
      return false;
    }
  },
  isRadioBlock:function(){
    if(this.elementType === "radio"){
      return true;
    }else{
      return false;
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
  }
});
