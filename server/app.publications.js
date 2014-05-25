Meteor.publish('items', function(){
  return Items.find();
});
Meteor.publish('forms', function(){
  return Forms.find();
});
Meteor.publish('data', function(){
  return Data.find();
});
