
Template.navbarFooter.events({
  'click #logOutLink':function(){
    Router.go('/sign-out');
  },
  'click #keybindingsLink':function(){
    $('#keybindingsModal').modal("show");
  },
  'click #promptLink':function(){
    $('#promptModal').modal("show");
  },
  'click #confirmLink':function(){
    $('#confirmModal').modal("show");
  },
  'click #errorToggleLink':function(){
    $('#errorPanel').sidebar('toggle');
  },
  'click #tutorialLink':function(){
    $('#tutorialModal').modal('show');
  },
  'click #eastPanelToggleLink':function(){
    // only toggle the sidebar if the user is logged in
    if(Meteor.user()){
      $('#eastPanel').sidebar('toggle');
    }
  }

});
