Session.setDefault('selectedStudyId', false);
Session.setDefault('selectedClient', {_id: "---", name: "---"});
Session.setDefault('isDeletingFormFromStudy', false);


Router.map(function(){
  this.route('newStudyRoute', {
    path: '/new/study',
    template: 'studiesEditPage',
    onBeforeAction: function(){
      setPageTitle("New Study");
    }
  });


  this.route('studiesEditRoute', {
    path: '/edit/study/:id',
    template: 'studiesEditPage',
    onBeforeAction: function(){
      setPageTitle("Edit Study");
      Session.set('selectedStudyId', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('studies');
    },
    data: function () {
      return Studies.findOne({_id: this.params.id });
    }
  });
});



//------------------------------------------------
// EVENTS

Template.studiesEditPage.events({
  'click .individualFormRow':function(){
    //alert('row ' + this._id + Session.get('selectedStudyId'));
    if(Session.get('isDeletingFormFromStudy')){
      Studies.update({_id: Session.get('selectedStudyId')},{$pull:{
        forms: this._id
      }});
      Session.set('isDeletingFormFromStudy', false);
    }
  },
  'click #deleteFormFromStudyButton':function(){
    Session.set('isDeletingFormFromStudy', true);
  },
  'click #addFormToStudyButton':function(){
    var self = this;
    //alert('add! ' + this._id);
    console.log('addingFormToStudy ' + this._id);

    $('#formSearchModal').modal("show");

    $('#formSearchModal').on('hidden.bs.modal', function (e) {
      console.log('selectedFormId', Session.get('selectedFormId'));
      //var form = Session.get('selectedForm');
      if(self._id){
        console.log(Studies.update({_id: self._id}, {$addToSet:{
            forms: Session.get('selectedFormId')
        }}));
      }
      Session.set('selectedFormId', null);
    });
    Session.set('isDeletingFormFromStudy', false);
  },
  'click #deleteStudyButton':function(){
    console.log('deleteStudyButton.id', this._id);
    if(confirm('Are you sure you want to delete this record?')){
      Studies.remove({_id: this._id});
      Session.set('selectedClient', {_id: "---", name: "---"});
      Router.go('/studies');
    }
  },
  'click #findStudyClientButton':function(){
    var self = this;
    //console.log('this.id', this._id);
    //if(Wombat.isAdminedBy(Meteor.userId())){
      Session.set('selectedUser', Meteor.userId());

      $('#clientSearchModal').modal("show");

      $('#clientSearchModal').on('hidden.bs.modal', function (e) {
        //Session.get('selectedClient');


        //Session.set('selectedClient', null);
      });

    //}else{
    //  Session.set('promptTitle', 'User Not Assigned to a Client');
    //  Session.set('promptMessage', 'Please contact your administrator and have them set your employer.');
    //  $('#promptModal').modal("show");
    //}
  },
  'click #saveStudyButton':function(){
    console.count('click #saveStudyButton');

    var client = Session.get('selectedClient');

    var formObject = {
      name: $('#studyNameInput').val(),
      description: $('#studyDescriptionInput').val(),
      url: $('#studyUrlInput').val(),
      createdAt: new Date(),
      owner: Meteor.user().profile.name,
      owner_id: Meteor.userId(),
      client: client.name,
      client_id: client._id
    };

    if(this._id){
      console.count('this._id: ' + this._id);

      var recordId = Studies.update({_id: this._id},{$set:{
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        client: formObject.client,
        client_id: formObject.client_id
      }});
      // console.log('Studies updated.  Now trying to rename other collections.')
      // Meteor.call('renameStudy', formObject, function(error, result){
      //   if(error){
      //     console.error(error);
      //   }
      //   if(result){
      //     console.log(result);
      //   }
      // });

    }else{
      var recordId = Studies.insert({
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        creator: Meteor.user().profile.name,
        creator_id: Meteor.userId(),
        client: formObject.client,
        client_id: formObject.client_id,
        forms: [],
        timestamp: new Date(),
        active: false
      });
      console.log(recordId);


    }
    Router.go('/studies/');
  }
});



//------------------------------------------------
// HELPERS

Template.studiesEditPage.helpers({
  isDeletingView: function(){
    if(Session.get('isDeletingFormFromStudy')){
      return "danger-striped";
    }
  },
  notNewStudy:function(){
    if(this._id){
      return true;
    }else{
      return false;
    }
  },
  formsList: function(){
    var study = Studies.findOne({_id: this._id});
    if(study){
      return Forms.find({ _id: {$in: study.forms }});
    }else{
      return [];
    }
  },
  getStudyClient: function(){
    return Session.get('selectedClient').name;
  },
  getStudyName: function(){
    if(this.name){
      return this.name;
    }else{
      return "New Study";
    }
  },
  selectedStudy: function(){
    console.log(Session.get('selectedStudyId'));
    if(Session.get('selectedStudyId')._id){
      return Studies.findOne({_id: Session.get('selectedStudyId')._id });
    }else{
      return {};
    }
  }
});
