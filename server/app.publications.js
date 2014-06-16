Meteor.publish('items', function(){
  return Items.find();
});
Meteor.publish('forms', function(){
  return Forms.find();
});
Meteor.publish('data', function(){
  return Data.find();
});

Meteor.publish('studies', function(){
  return Studies.find();
});
Meteor.publish('clients', function(){
  return Clients.find();
});
Meteor.publish(null, function (){
  return Meteor.roles.find();
})
