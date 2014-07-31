UI.registerHelper('getCreatedAt', function(){
  return moment(this.createdAt).format("YYYY-MM-DD hh:mm a");
});

UI.registerHelper('isLoggedIn', function() {
  if(Meteor.userId()){
    return true;
  }else{
    return false;
  }
});

UI.registerHelper('getApprovalIcon', function(){
  if(this.approved){
    return 'fa-check';
  }else{
    return 'fa-inbox';
  }
});

UI.registerHelper('getDeleteIcon', function(){
  if ( !this.deleted ) {
    return 'fa-trash-o';
  }
});

UI.registerHelper('getLockedIcon', function(){
  if(this.locked){
    return 'fa-lock';
  }else{
    return 'fa-unlock';
  }
});

//===================================================

UI.registerHelper('isTextBlock', function(){
  if(this.elementType === "plaintext"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isRadioBlock', function(){
  if(this.elementType === "radio"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isInput',function(){
  if(this.elementType === "input"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isTextarea', function(){
  if(this.elementType === "textarea"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSpacer', function(){
  if(this.elementType === "spacer"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isYesNoBlock', function(){
  if(this.elementType === "yesno"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSectionTitle', function(){
  if(this.elementType === "section"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isDateTimeBlock', function(){
  if(this.elementType === "datetime"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isTimeBlock', function(){
  if(this.elementType === "time"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSectionTitle', function(){
  if(this.elementType === "section"){
    return true;
  }else{
    return false;
  }
});
