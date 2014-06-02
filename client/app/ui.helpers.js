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
