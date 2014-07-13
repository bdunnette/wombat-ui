Meteor.methods({
    setUserSponsor:function(sponsor){
    return result = Meteor.users.update(sponsor.user_id,{$set:{
      'profile.sponsor': sponsor.name,
      'profile.sponsor_id': sponsor._id
    }});
  }
});
