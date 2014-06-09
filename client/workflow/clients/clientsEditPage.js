Session.setDefault('selectedClientId', false);


Router.map(function(){
  this.route('newClientRoute', {
    path: '/newclient',
    template: 'clientsEditPage',
    onBeforeAction: function(){
      setPageTitle("New Client");
    }
  });


  this.route('clientsEditRoute', {
    path: '/editclient/:id',
    template: 'clientsEditPage',
    onBeforeAction: function(){
      setPageTitle("Edit Client");
    },
    waitOn: function(){
      return Meteor.subscribe('clients');
    },
    data: function () {
      return Clients.findOne({_id: this.params.id });
    }
  });
});


//------------------------------------------------
// DATA LAYER

Template.clientsEditPage.selectedClient = function(){
  console.log(Session.get('selectedClientId'));
  if(Session.get('selectedClientId')._id){
    return Clients.findOne({_id: Session.get('selectedClientId')._id });
  }else{
    return {};
  }
};

//------------------------------------------------
// EVENTS

Template.clientsEditPage.events({
  'click #saveClientButton':function(){
    console.count('click #saveClientButton');
    if(this._id){
      console.count('this._id: ' + this._id);

      var formObject = {
        _id: this._id,
        name: $('#clientNameInput').val(),
        description: $('#clientDescriptionInput').val(),
        url: $('#clientUrlInput').val(),
        createdAt: new Date(),
        owner: Meteor.user().profile.name,
        owner_id: Meteor.userId()
      };

      console.log('Clients updated.  Now trying to rename other collections.')
      Meteor.call('renameClient', formObject, function(error, result){
        if(error){
          console.error(error);
        }
        if(result){
          console.log(result);
        }
      });

    }else{
      var recordId = Clients.insert({
        name: $('#clientNameInput').val(),
        description: $('#clientDescriptionInput').val(),
        url: $('#clientUrlInput').val(),
        invite_code: $('#clientInviteCodeInput').val(),
        owner: Meteor.user().profile.name,
        owner_id: Meteor.userId(),
        creator: Meteor.user().profile.name,
        creator_id: Meteor.userId(),
        timestamp: new Date()
      });
      console.log(recordId);


    }
    Router.go('/clients/');
  }
});

Template.clientsEditPage.getClientName = function(){
  if(this.name){
    return this.name;
  }else{
    return "New Client";
  }
};
