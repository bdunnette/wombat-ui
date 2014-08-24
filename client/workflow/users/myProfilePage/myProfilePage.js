Session.setDefault('isAlertVisible', false);


Template.myProfilePage.events({
  'click #editProfileButton':function(){
    Router.go('/user/edit/' + Meteor.userId());
  }
});



Template.myProfilePage.helpers({
  isAlertVisible: function(){
    return Session.get('isAlertVisible');
  },
  user: function(){
    if(Meteor.user()){
      return Meteor.user();
    }else{
      return {};
    }
  }
});
