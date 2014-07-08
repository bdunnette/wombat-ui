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
UI.registerHelper('getProfileAvatar', function() {
  if(Meteor.user()){
    if(Meteor.user().profile){
      if(Meteor.user().profile.avatar){
        return Meteor.user().profile.avatar;
      }else{
        return "/images/icons/Default_User.png";
      }
    }else{
      return "/images/icons/Default_User.png";
    }
  }else{
    return "/images/icons/Default_User.png";
  }
});

UI.registerHelper('getAvatar', function() {
  var userId;
  if(this._id){
    userId = this._id;
  }else{
    userId = Meteor.userId();
  }
  var userRecord = Meteor.users.findOne({_id: userId});
  if(userRecord){
    if(userRecord.profile){
      if(userRecord.profile.avatar){
        return userRecord.profile.avatar;
      }else{
        return "/images/icons/Default_User.png";
      }
    }else{
      return "/images/icons/Default_User.png";
    }
  }else{
    return "/images/icons/Default_User.png";
  }
});

// UI.registerHelper('getClient', function(){
//   console.log("UI.registerHelper.getClient");
//   if(Session.get('selectedClientId')){
//     //console.log(Session.get('selectedClientId').name);
//     return Session.get('selectedClientId').name;
//   }else{
//     if(this.profile){
//       if(this.profile.client){
//         //console.log("this.profile.client: " + this.profile.client);
//         return this.profile.client;
//       }else{
//         //console.log("---");
//         return "No client specified in user profile.";
//       }
//     }else{
//       //console.log("---");
//       return "---";
//     }
//   }
// });
