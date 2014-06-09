

Router.map(function(){
  this.route('clientRecordRoute', {
    path: '/client/:id',
    template: 'clientsRecordPage',
    onBeforeAction: function(){
      setPageTitle("Client");
    },
    waitOn: function(){
      Meteor.subscribe('settings');
      return Meteor.subscribe('clients');
    },
    data: function () {
      return Clients.findOne({_id: this.params.id});
    }
  });
});





Template.clientsRecordPage.clientRecord = function(){
  if(this){
    return Clients.findOne(this._id);
  }else{
    return {
      name: "---",
      description: "---",
      url: "---",
      owner: "---",
      owner_id: "---"
    };
  }
};
Template.clientsRecordPage.getClientName = function(){
  return this.name;
};
Template.clientsRecordPage.events({
  'click #editClientButton':function(){
    Router.go('/editclient/'  + this._id._str);
  },
  'click #deleteClientButton':function(){
    var userIsSure = confirm("Are you sure you want to delete creative #" + this._id._str);
    if(userIsSure){
      Clients.remove({_id: this._id});
      Router.go('/clients/');
    }
  },
  'click #cancelEmailInviteButton':function(){
    Session.set('isInvitingUser', false);
  }
});
