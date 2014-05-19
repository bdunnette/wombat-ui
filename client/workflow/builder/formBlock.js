
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
  }
});
