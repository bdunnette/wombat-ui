Session.setDefault('isDirtyUserRecord', false);
Session.setDefault('isDirtyPassword', false);
Session.setDefault('modalReturnRoute', false);

Session.setDefault('passwordConfirmed', false);
Session.setDefault('selectedUser', false);
Session.setDefault('selectedSponsorId', false);
Session.setDefault('functionPassing', null);

Router.map(function(){
  this.route('editProfileRoute', {
    path: '/edituser/:id',
    template: 'userEditPage',
    onBeforeAction: function(){
      Session.set('selectedUser', this.params.id);
    },
    waitOn: function(){
      Meteor.subscribe('userDirectory');
      return Meteor.subscribe('userProfile');
    }
    // data: function () {
    //   console.log('this.params.id',this.params.id);
    //   return Meteor.users.findOne({_id: this.params.id});
    // }
  });
  this.route('newUserRoute', {
    path: '/newuser',
    template: 'userEditPage',
    onBeforeAction: function(){
      setPageTitle("New User");
    },
    waitOn: function(){
      return Meteor.subscribe('userProfile');
    },
    data: function () {
      return {};
    },
    onAfterAction: function() {
      Session.set('isOnListPage', false);
    }
  });
});


Template.userEditPage.events({
  'click #findSponsorButton':function(){
    var self = this;
    console.log('this.id', this._id);
    //if(Wombat.isAdminedBy(Meteor.userId())){
      Session.set('selectedUser', this._id);

      $('#sponsorSearchModal').modal("show");

      $('#sponsorSearchModal').on('hidden.bs.modal', function (e) {
        var employer = Session.get('selectedSponsor');

        if(employer){
          employer.user_id = self._id;
          console.log("Employer", employer);

          Meteor.call('setUserSponsor', employer, function(error, result){
            if(error){
              console.error('error updating user', error);
            }
            if(result){
              console.log('created user' + result);
            }
          });
        }
        // setting the record dirty may not be needed, if we want to save things right away
        // but we set it just to be safe
        Session.set('isDirtyUserRecord', true);
        Session.set('selectedSponsor', null);
      });

    //}else{
    //  Session.set('promptTitle', 'User Not Assigned to a Sponsor');
    //  Session.set('promptMessage', 'Please contact your administrator and have them set your employer.');
    //  $('#promptModal').modal("show");

      // alert('Please contact your administrator to set your employer.');
    //}
  },
  'click #findRoleButton': function(){
    var self = this;

    Session.set('selectedUser', this._id);

    $('#selectRoleModal').modal("show");

    $('#selectRoleModal').on('hidden.bs.modal', function (e) {
      var role = Session.get('selectedRole');

      if(role){
        role.user_id = self._id;
        console.log("Role", role);

        Meteor.call('setUserRole', role, function(error, result){
          if(error){
            console.error(error);
          }
          if(result){
            console.log('updated role :' + result);
          }
        });
      }
      // setting the record dirty may not be needed, if we want to save things right away
      // but we set it just to be safe
      Session.set('isDirtyRecord', true);
      Session.set('selectedRole', null);
    });

  },
  'keydown #profileUsernameInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileEmailInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
//  'keydown #profilePasswordInput':function(){
//    Session.set('isDirtyUserRecord', true);
//  },
//  'keydown #profilePasswordConfirmInput':function(){
//    Session.set('isDirtyUserRecord', true);
//  },
  'keydown #profileNameInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileTitleInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileCompanyInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileAvatarInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profilePhoneInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileWebsiteInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileAddressInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileCityInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileStateInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keydown #profileZipInput':function(){
    Session.set('isDirtyUserRecord', true);
  },
  'keyup #profilePasswordInput':function(){
    if($('#profilePasswordConfirmInput').val() == $('#profilePasswordInput').val()){
      if($('#profilePasswordInput').val() !== ""){
        Session.set('passwordConfirmed', true);
      }else{
        Session.set('passwordConfirmed', false);
      }
    }else{
      Session.set('passwordConfirmed', false);
    }
  },
  'keyup #profilePasswordConfirmInput':function(){
    if($('#profilePasswordConfirmInput').val() == $('#profilePasswordInput').val()){
      Session.set('passwordConfirmed', true);
    }else{
      Session.set('passwordConfirmed', false);
    }
  },

  'click #setAsSysAdminButton': function(){
    if(this._id){
      var input = {
        _id: this._id,
        profile: {role: "SysAdmin"}
      };
      Meteor.call('updateUserRole', input);
    }else{
      this.profile.role = "SysAdmin";
    }
  },
  'click #setAsAdminButton': function(){
    if(this._id){
      var input = {
        _id: this._id,
        profile: {role: "Admin"}
      };
      Meteor.call('updateUserRole', input);
    }else{
      this.profile.role = "Admin";
    }
  },
  'click #setAsUserButton': function(){
    if(this._id){
      var input = {
        _id: this._id,
        profile: {role: "User"}
      };
      Meteor.call('updateUserRole', input);
    }else{
      this.profile.role = "User";
    }
  },
  'click #helpTipsVisibleButton':function(){
    Meteor.users.update(this._id,{$set:{
      'profile.helpTipsVisible':"visible"
    }});
  },
  'click #helpTipsHiddenButton':function(){
    Meteor.users.update(this._id,{$set:{
      'profile.helpTipsVisible':"hidden"
    }});
  },
  'click #tableEntriesTwentyButton':function(){
    // TODO: refactor profile.tableEntries to profile.tableEntriesLimit
    Meteor.users.update(this._id,{$set:{
      'profile.tableEntries': 'twenty'
    }});
  },
  'click #tableEntriesFiftyButton':function(){
    Meteor.users.update(this._id,{$set:{
      'profile.tableEntries': 'fifty'
    }});
  },
  'click #tableEntriesHundredButton':function(){
    Meteor.users.update(this._id,{$set:{
      'profile.tableEntries': 'hundred'
    }});
  },
  'click #updatePasswordButton':function(event){
    if($('#profilePasswordInput').val() == $('#profilePasswordConfirmInput').val()){
      Meteor.call('setUserPassword',{id: this._id, password: $('#profilePasswordInput').val() },function(error,result){
        if(error){
          console.error(error);
        }
        if(result){
          Session.set('passwordConfirmed', false);
          $('#profilePasswordConfirmInput').val('');
          $('#profilePasswordInput').val('');
          console.log(result);
        }
      });
    }
    event.preventDefault();
  }
});

-

// 'this' refers to the local data context defined by the router
// it should refer to a record corresponding to the url/:id parameter
// if it doesn't exist, we give an empty object
// so the template can render anyway

Template.userEditPage.helpers({
  user: function(){
    console.log('Template.userEditPage.user', this);

    var user = Meteor.users.findOne({_id: Session.get('selectedUser')});

    if(user){
      return user;
    }else{
      return {
        profile:{
          role:"User"
        }
      };
    }
  },
  passwordIsValid: function(){
    return Session.get('passwordConfirmed');
  },
  isValidated: function(){
    if($("#profilePasswordInput").val() === ""){
      return "";
    }else{
      if(Session.get('passwordConfirmed')){
        return "has-success";
      }else{
        return "has-error";
      }
    }
  },
  newOrEditUser: function(){
    console.log('newOrEditUser', this);
    if(this._id){
      return "Edit User";
    }else{
      return "New User";
    }
  },
  createOrSaveText: function(){
    if(this._id){
      return "Save Changes";
    }else{
      return "Create User";
    }
  },
  sysAdminButtonSelected: function(){
    if(this.profile){
      if(this.profile.role === "SysAdmin"){
        return "active";
      }
    }
  },
  adminButtonSelected: function(){
    if(this.profile){
      if(this.profile.role === "Admin"){
        return "active";
      }
    }
  },
  userButtonSelected: function(){
    if(this.profile){
      if(this.profile.role === "User"){
        return "active";
      }
    }
  }
});







//-------------------------------------------------------------
// FORM GETTERS

Template.userEditPage.helpers({
  getUsername: function(){
    if(this.username){
      return this.username;
    }else{
      return "";
    }
  },
  getEmail: function(){
    if(this.emails){
      return this.emails[0].address;
    }else{
      return "";
    }
  },
  getName: function(){
    if(this.profile){
      return this.profile.name;
    }else{
      return "";
    }
  },
  getTitle: function(){
    if(this.profile){
      return this.profile.title;
    }else{
      return "";
    }
  },
  getSponsor: function(){
    console.log("Template.userEditPage.getSponsor");
    if(this.profile){
      if(this.profile.sponsor){
        console.log("this.profile.sponsor: " + this.profile.sponsor);
        return this.profile.sponsor;
      }else{
        return "No sponsor set in profile.";
      }
    }else{
      return Session.get('selectedSponsor').name;
    }
  },
  getRole: function(){
    console.log("Template.userEditPage.getRole");
    if(this.profile){
      if(this.profile.roles){
        console.log("this.profile.role", this.profile.roles);
        return this.profile.roles;
      }else{
        return "No role set.";
      }
    }else{
      return Session.get('selectedUserRole').name;
    }
  },
  getEmployer: function(){
    if(Session.get('selectedSponsorId')){
      return Session.get('selectedSponsorId').name;
    }else{
      if(this.profile){
        return this.profile.employer;
      }else{
        return "No employer in profile.";
      }
    }
  },
  getEmployerId: function(){
    if(Session.get('selectedSponsorId')){
      return Session.get('selectedSponsorId')._id;
    }else{
      if(this.profile){
        return this.profile.employer_id;
      }else{
        return "---";
      }
    }
  },
  getPhone: function(){
    if(this.profile){
      return this.profile.phone;
    }else{
      return "";
    }
  },
  getWebsite: function(){
    if(this.profile){
      return this.profile.website;
    }else{
      return "";
    }
  },
  getHelpTipsVisible:function(value){
    if(this.profile){
      if(this.profile.helpTipsVisible === value){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  getTableEntriesVisible:function(value){
    if(this.profile){
      if(this.profile.tableEntries === value){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  }
});





//-------------------------------------------------------------

Template.dirtyUserSave.events({
  'click #submitProfileInfoButton':function(){

    var input = {
      _id: this._id,
      username: $('#profileUsernameInput').val(),
      address: $('#profileEmailInput').val(),
      password: $('#profilePasswordInput').val(),
      profile:{
        name: $('#profileNameInput').val(),
        title: $('#profileTitleInput').val(),
        company: $('#findCompanyButton').html(),
        avatar: $('#profileAvatarInput').val(),

        employer: $('#profileEmployerInput').val(),
        employer_id: $('#profileEmployerIdInput').val(),

        phone: $('#profilePhoneInput').val(),
        website: $('#profileWebsiteInput').val(),
        address: $('#profileAddressInput').val(),
        city: $('#profileCityInput').val(),
        state: $('#profileStateInput').val(),
        zip: $('#profileZipInput').val()
      }
    };

    if(this._id){
      Meteor.call('updateUser', input, function(error, result){
        if(error){
          console.error('error updating user', error);
        }
        if(result){
          console.log('created user :' + result);
        }
      });
    }else{
      Meteor.call('createNewUser', input, function(error, result){
        if(error){
          console.error('error creating new user', error);
        }
        if(result){
          console.log('created user :' + result);
          Router.go('/users/');
        }
      });
    }
    Session.set('isDirtyUserRecord', false);
  }
});


Template.dirtyUserSave.helpers({
  createOrSaveText: function(){
    if(this._id){
      return "Save Changes";
    }else{
      return "Create User";
    }
  },
  isDirtyUserRecord: function(){
    if(Session.get('isDirtyUserRecord')){
      return "visible";
    }else{
      return "hidden";
    }
  }
});
