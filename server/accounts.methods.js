// getUserService = function(user) {
//   for(var service in user.services) {
//     if(service === "facebook") return "facebook";
//     if(service === "github") return "github";
//     if(service === "twitter") return "twitter";
//     if(service === "google") return "google";
//   }
// }
//
//
// Accounts.onCreateUser(function(options, user) {
//   // We still want the default hook's 'profile' behavior.
//   console.log('*****************************');
//   console.log(JSON.stringify(user));
//   console.log('-----------------------------');
//   console.log(JSON.stringify(options));
//   console.log('=============================');
//
//   var service = getUserService(user);
//
//   user.profile = options.profile;
//   user.configuration = options.configuration;
//   user.role = options.role;
//
//   //avatars for various services
//   if(service == "facebook") {
//     user.profile.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square";
//   }else if(service == "github") {
//     user.profile.avatar = user.services.github.avatar_url;
//   }else if(service == "google") {
//     user.profile.avatar = user.services.google.picture
//   }else{
//     if(user.profile.avatar == null){
//       user.profile.avatar = '/img/icons/Default_User.png';
//     }
//   }
//
//   //extract username and profile name from email
//   if(!user.username){
//     user.username = user.emails[0].address.split('@')[0];
//   }
//   if(!user.profile.name){
//     user.profile.name = user.emails[0].address.split('@')[0];
//   }
//   if(!user.profile.role){
//     user.profile.role = "User";
//   }
//   if(!user.profile.name){
//     user.profile.name = user.username;
//   }
//
//   if(!user.access_token){
//     user.access_token = Insights.randomString(25);
//   }
//
//   console.log(JSON.stringify(user));
//   console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
//   return user;
// });



Meteor.methods({
  setUserEmployer:function(employer){
    console.log('setUserEmployer');
    console.log(employer);
    var result = Meteor.users.update(employer.user_id,{$set:{
      'profile.company': employer.name,
      'profile.employer': employer.name,
      'profile.employer_id': employer._id
    }});
    return result;
  },
  setUserPassword: function(options){
    console.log('setUserPassword');
    console.log(options);
    console.log('Meteor.userId() ' + Meteor.userId());
    if((options.id == Meteor.userId()) || Meteor.user().profile.role == "Admin"){
      console.log('Access to change password verified.');
      Accounts.setPassword(options.id, options.password);
      return "Success.  Changed password to " + options.password;
    }else{
      console.log('Error changing password. Access denied.');
      return 'Error changing password. Access denied.';
    }
  },
  createAccessToken: function(){
    console.log('createAccessToken for user ' + Meteor.userId());

    var access_token = Insights.randomString(25);
    try{
      console.log(access_token);
      Meteor.users.update({_id: Meteor.userId()},{$set:{
        access_token: access_token
      }});
      console.log(Meteor.user());
      return access_token;
    }catch(message){
      console.error(message);
    }
    return access_token;
  },

  updateUserRole: function(input){
    console.log('updating user...')
    console.log(input);

    var result = Meteor.users.update(input._id,{$set:{
      'profile.role': input.profile.role
    }});

    console.log(result);
    return result;
  },
  updateUserPreferences: function(input){
    console.log('updateUserPreferences...')
    console.log(input);

    var result = Meteor.users.update(input._id,{$set:{
      'profile.helpTipsVisible': input.profile.helpTipsVisible,
      'profile.tableEntries': input.profile.tableEntries
    }});

    console.log(result);
    return result;
  },
  removeUser: function(userId){
    console.log('removing user...' + userId);

    var result = Meteor.users.remove({_id: userId });

    console.log(result);
    return result;

  },
  isAdmin: function (userId) {
    check(userId, String);
    console.log('checking if user ' + userId + ' is an Admin...');
    var user = Meteor.users.findOne(userId);
    console.log(user.profile.role);
    if(user.profile.role == "Admin"){
      return true;
    }else{
      return false;
    }
  },
  isModerator: function (userId) {
    check(userId, String);

    try{
      console.log('checking if user ' + userId + ' is a Moderator...');
      var user = Meteor.users.findOne(userId);
      if(user.profile.role == "Moderator"){
        return true;
      }else{
        return false;
      }
    }catch(error){
      console.log(error);
      return false;
    }
  },
  isEditor: function (userId) {
    check(userId, String);

    try{
      console.log('checking if user ' + userId + ' is an Editor...');
      var user = Meteor.users.findOne(userId);
      if(user.profile.role == "Editor"){
        return true;
      }else{
        return false;
      }
    }catch(error){
      console.log(error);
      return false;
    }
  }
});
