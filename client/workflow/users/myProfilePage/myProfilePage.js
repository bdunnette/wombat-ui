Template.myProfilePage.events({
  'click #editProfileButton':function(){
    //alert('/edituser/' + Meteor.userId());
    Router.go('/edituser/' + Meteor.userId());
  }
});

Session.setDefault('isAlertVisible', false);
Template.myProfilePage.isAlertVisible = function(){
  return Session.get('isAlertVisible');
}


Template.myProfilePage.user = function(){
  console.log(Session.get('selectedUserId'));
  if(Meteor.user()){
    // if(Meteor.user().profile.employer_invitation_id){
    //   Session.set('isAlertVisible', true);
    // }
    return Meteor.user();
  }else{
    return {};
  }
  //return Meteor.users.findOne({_id: Session.get('selectedUserId')});
};

Template.myProfilePage.getSelectedCampaignId = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      return Meteor.user().profile.selected_campaign_id;
    }else{
      return 'Campaign Id not found.';
    }
  }else{
    return 'User Profile Id not found.';
  }
}
Template.myProfilePage.getSelectedCampaignName = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      return Meteor.user().profile.selected_campaign_name;
    }else{
      return 'Campaign not found.';
    }
  }else{
    return 'User Profile not found.';
  }
}




Template.myProfilePage.getEmployerId = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      if(Meteor.user().profile.employer_id){
        return Meteor.user().profile.employer_id;
      }
      else{
        return "---";
      }
    }
  }else{
    return "---";
  }
}
Template.myProfilePage.getEmployerName = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      if(Meteor.user().profile.employer){
        return Meteor.user().profile.employer;
      }
      else{
        return "---";
      }
    }
  }else{
    return "---";
  }
}



Template.myProfilePage.getEmployerInvitationId = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      if(Meteor.user().profile.employer_invitation_id){
        return Meteor.user().profile.employer_invitation_id;
      }
      else{
        return "---";
      }
    }
  }else{
    return "---";
  }
}
Template.myProfilePage.getEmployerInvitationName = function(){
  if(Meteor.user()){
    if(Meteor.user().profile){
      if(Meteor.user().profile.employer_invitation){
        return Meteor.user().profile.employer_invitation;
      }
      else{
        return "---";
      }
    }
  }else{
    return "---";
  }
}
