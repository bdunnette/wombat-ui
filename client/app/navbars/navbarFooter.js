Template.navbarFooter.helpers({
  isFormBuilder: function(){
    if(Router.current()){
      if(Router.current().path.indexOf('builder') > 0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  isSavedForms: function(){
    if(Router.current()){
      if(Router.current().path.indexOf('form/') > 0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  isCollectedData: function(){
    if(Router.current()){
      if(Router.current().path.indexOf('data/') > 0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  isPublished: function(){
    var currentForm = Forms.findOne(Session.get('currentForm'));
    if(currentForm){
      if(currentForm.stared){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  },
  isApproved: function(){
    var dataRecord = Data.findOne(Session.get('currentDataRecord'));
    if(dataRecord){
      if(dataRecord.approved){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }

  },
  isLocked: function(){
    var dataRecord = Data.findOne(Session.get('currentDataRecord'));
    if(dataRecord){
      if(dataRecord.locked){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }

  }
});


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
      toggleWestPanel();
      toggleEastPanel();
    }
  },

  //-----------------------------------------
  // BUILDER EVENTS

  // TODO refactor #saveFormLink to #saveBuilderLink
  'click #saveFormLink':function(){
    console.log('click #saveFormLink', this);
    saveForm(this);
  },
  // TODO refactor #clearFormLink to #clearBuilderLink
  'click #clearFormLink':function(){
    Meteor.call('dropForm');
  },


  //-----------------------------------------
  // DATA COLLECTION EVENTS

  'click #deleteDataLink':function(){
    if(confirm('Are you sure you want to delete this record?')){
      Meteor.call('dropDataRecord', Session.get('currentDataRecord'));
      Router.go('/data');
    }
  },
  'click #editDataLink':function(){
    Router.go('/form/' + this.schema_id);
  },
  'click #approveDataLink':function(){
    Meteor.call('approveDataRecord', Session.get('currentDataRecord'));
    Router.go('/data'); // return to the list of completed forms after approving the form
  },
  'click #lockDataLink':function(){
    Meteor.call('lockDataRecord', Session.get('currentDataRecord'));
    Router.go('/data'); // return to the list of completed forms after approving the form
  },

  //-----------------------------------------
  // SAVED FORMS EVENTS

  'click #collectDataLink': function(){
    var record = Forms.findOne({_id: Session.get('currentForm')});
    var newDataRecord = {
      createdAt: new Date(),
      schema_id: this._id,
      formName: this.formName,
      data: {}
    }
    record.schema.forEach(function(block){
      newDataRecord.data[block._id] = $("#input-" + block._id).val();
    });
    Data.insert(newDataRecord);
    Router.go('/data');
  },
  'click #publishFormLink':function(){
    if(this.stared){
      Forms.update({_id: this._id},{$set:{
        stared: false
      }});
    }else{
      Forms.update({_id: this._id},{$set:{
        stared: true
      }});
    }
  },
  'click #editFormLink':function(){
    Router.go('/builder/' + this._id);
  },
  'click #deleteFormLink':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Forms.remove({_id: this._id});
      Router.go('/');
    }
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
