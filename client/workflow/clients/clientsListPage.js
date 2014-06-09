Session.setDefault('clientsListSearchFilter', '');
Session.setDefault('clientsListPaginationCount', 1);
Session.setDefault('clientsListSelectedPagination', 0);
Session.setDefault('clientsListSkipCount', 0);

// TODO: refactor usersListTableLimit to usersListTableEntriesLimit
Session.setDefault('clientsListTableLimit', 50);



Router.map(function(){
  this.route('clientsListRoute', {
    path: '/clients',
    template: 'clientsListPage',
    onBeforeAction: function(){
      setPageTitle("Clients");
    },
    waitOn: function(){
      Meteor.subscribe('settings');
      return Meteor.subscribe('clients');
    },
    onAfterAction: function() {
      Session.set('currentPage', 'clientsListPage');
      Session.set('isOnListPage', true);
    }
  });
});






//TODO: refactor clientsListBlock to clientsListPage
Template.clientsListPage.helpers({
  clientsList: function () {
    Session.set('clientsListReceivedData', new Date());
    Session.set('clientsListPaginationCount', Math.floor(Clients.find().count() / Session.get('clientsListTableLimit')));

    if(Wombat.checkForHexCode.test(Session.get('clientsListSearchFilter'))){
      return Clients.find({_id: new Meteor.Collection.ObjectID(Session.get('clientsListSearchFilter'))});
    }else{
      return Clients.find({$or:[
          {name: {
            $regex: Session.get('clientsListSearchFilter'),
            $options: 'i'
          }},
          {name: { $regex: Session.get('clientsListSearchFilter'), $options: 'i' }},
          {description: { $regex: Session.get('clientsListSearchFilter'), $options: 'i' }},
          {owner: { $regex: Session.get('clientsListSearchFilter'), $options: 'i' }}
        ]},{
          limit: Session.get('clientsListTableLimit'),
          skip: Session.get('clientsListSkipCount'),
          sort: {name: 1}
        });

    }
    //return Clients.find({},{sort: {_id: -1}});
  },
  rendered: function(){
    $(this.find('#clientsTable')).tablesorter();

    Deps.autorun(function(){
      setTimeout(function(){
        $("#clientsTable").trigger("update");
      }, 200);
    });
  }
});


Template.clientsListPage.events({
  'click .clientListItem': function () {
    Session.set('selectedClientId', {
      _id: this._id,
      name: this.name
    });
    Router.go('/client/' + this._id);
  },
  'keyup #clientsSearchInput':function(){
    Session.set('clientsListSearchFilter', $('#clientsSearchInput').val());
  },
  'click #createClientButton':function(){
    Router.go('/newclient');
    //alert('click');
  }
});





Template.clientListItem.getId = function(){
  if(this._id){
    if(this._id._str){
      return this._id._str;
    }else{
      return this._id;
    }
  }else{
    return "---";
  }
};

// sorry, this has a lot of double negatives
Template.clientsListPage.isCrudPattern = function(){
  if(Session.get('modalReturnRoute')){
    return false;
  }else{
    return true;
  }
}
