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
