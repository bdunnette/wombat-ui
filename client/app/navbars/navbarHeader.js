
// ---------------------------------------------------------------
// template events

Template.navbarHeader.events({
  'click #navbarBrandLink':function(){
    // only toggle the sidebar if the user is logged in
    if(Meteor.user()){
      //$('#westPanel').sidebar('toggle');
      //toggleWestPanel();
      Router.go('/');
    }else{
      Router.go('/');
    }
  },
  'click #logOutLink':function(){
    Router.go('/sign-out');
  }
});



// ---------------------------------------------------------------
// template helpers

Template.navbarHeader.helpers({
  getSelectedBlock: function(){
    return Session.get('selectedBlockItem');
  }
});
Template.navbarHeader.getUserName = function(){
  if(Meteor.userId()){
    if(Meteor.user()){
      //return Meteor.user().emails[0].address;
      return Meteor.user().username;
    }else{
      return "---";
    }
  }else{
    return "Sign In";
  }
};
