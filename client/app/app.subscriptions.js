Deps.autorun(function(){
  Meteor.subscribe('items');
  Meteor.subscribe('forms');
  Meteor.subscribe('data');
  Meteor.subscribe('studies');
  Meteor.subscribe('clients');
});
