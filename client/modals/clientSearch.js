Session.setDefault('clientSearchFilter', '');
Session.setDefault('selectedClient', null);

Template.clientSearchModal.clientList = function(){
  return Clients.find({name: {
    $regex: Session.get('clientSearchFilter'),
    $options: 'i',
    $ne: 'Default Client'
  }});
};

Template.clientSearchModal.getClientCount = function(){
  return Clients.find().count();
};
Template.clientSearchModal.getSearchTerm = function(){
  return Session.get('clientSearchFilter');
};
Template.clientSearchModal.events({
  'click .list-group-item':function(){
    Session.set('selectedClient', {
      _id: this._id,
      name: this.name
    });
  },
  'keyup #clientSearchModalInput':function(){
    Session.set('clientSearchFilter', $('#clientSearchModalInput').val());
  }
});
