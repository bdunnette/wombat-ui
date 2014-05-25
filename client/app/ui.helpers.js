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
