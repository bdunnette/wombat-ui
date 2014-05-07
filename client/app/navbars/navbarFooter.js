
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
  },

  'click #saveFormLink':function(){
    saveForm();
  }

});


saveForm = function(){
  var blockItems = Items.find().fetch();
  console.log("Saving Form: ", JSON.stringify(blockItems));

  var newForm = {
    createdAt: new Date(),
    stared: false,
    active: true,
    formName: $('#formNameInput').val(),
    owner: Meteor.userId(),
    ownerUsername: Meteor.user().username,
    schema: blockItems,
    numBlocks: blockItems.length
  };

  Forms.insert(newForm);
}
