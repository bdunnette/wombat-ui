
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
      //$('#eastPanel').sidebar('toggle');
      toggleEastPanel();
    }
  },

  'click #saveFormLink':function(){
    console.log('click #saveFormLink', this);
    saveForm(this);
  },
  'click #clearFormLink':function(){
    Meteor.call('dropForm');
  }

});


saveForm = function(scope){
  var blockItems = Items.find().fetch();
  console.log("Saving  Schema: ", JSON.stringify(blockItems));
  console.log('_id', scope._id);


  var newForm = {
    createdAt: new Date(),
    stared: false,
    active: true,
    formName: $('#formTitleInput').val(),
    owner: Meteor.userId(),
    ownerUsername: Meteor.user().username,
    schema: blockItems,
    numBlocks: blockItems.length
  };
  if(Session.get('currentForm')){
    Forms.update({_id: Session.get('currentForm')},{$set:{
      stared: newForm.stared,
      active: newForm.active,
      formName: newForm.formName,
      owner: newForm.owner,
      ownerUsername: newForm.ownerUsername,
      schema: newForm.schema,
      numBlocks: newForm.numBlocks
    }});
  }else{
    Forms.insert(newForm);
  }
  Router.go('/forms');
}
