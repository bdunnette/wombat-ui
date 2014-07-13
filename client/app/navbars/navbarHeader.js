Session.setDefault('selectedSubject', false);

// ---------------------------------------------------------------
// template events

Template.navbarHeader.events({
  'click #navbarBrandLink':function(){
    Router.go('/');
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
  },
  getSelectedSubject: function(){
    if(Session.get('selectedSubject')){
      return Session.get('selectedSubject').name;
    }else{
      return "No subject selected.";
    }
  },
  getUserName: function(){
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
  }
});
