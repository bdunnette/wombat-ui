Meteor.methods({
    setUserClient:function(client){
    // console.log('setUserClient');
    // console.log(employer);
    return result = Meteor.users.update(client.user_id,{$set:{
      'profile.client': client.name,
      'profile.client_id': client._id
    }});
  }
});
