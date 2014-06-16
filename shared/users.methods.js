Meteor.methods({
  createNewUser: function(input){
    console.log('creating new user...');
    console.log(input);

    var result = Accounts.createUser({
      username: input.username,
      email: input.address,
      password: input.password,
      profile: input.profile
    });

    console.log(result);
    return result;
  },

  updateUser: function(input){
    console.log('updating user...')
    console.log(input);

    return result = Meteor.users.update(input._id,{$set:{
      'profile.name': input.profile.name,
      'profile.title': input.profile.title,

      'profile.client': input.profile.client,
      'profile.client_id': input.profile.client_id,

      'profile.avatar': input.profile.avatar,
      'profile.phone': input.profile.phone,
      'profile.website': input.profile.website,
      'profile.address': input.profile.address,
      'profile.city': input.profile.city,
      'profile.state': input.profile.state,
      'profile.zip': input.profile.zip
    }});
  }
});
