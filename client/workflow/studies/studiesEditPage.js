Session.setDefault('selectedStudyId', false);


Router.map(function(){
  this.route('newStudyRoute', {
    path: '/new/study',
    template: 'studiesEditPage',
    onBeforeAction: function(){
      setPageTitle("New Study");
    }
  });


  this.route('studiesEditRoute', {
    path: '/edit/study/:id',
    template: 'studiesEditPage',
    onBeforeAction: function(){
      setPageTitle("Edit Study");
    },
    waitOn: function(){
      return Meteor.subscribe('studies');
    },
    data: function () {
      return Studies.findOne({_id: this.params.id });
    }
  });
});


//------------------------------------------------
// DATA LAYER

Template.studiesEditPage.selectedStudy = function(){
  console.log(Session.get('selectedStudyId'));
  if(Session.get('selectedStudyId')._id){
    return Studies.findOne({_id: Session.get('selectedStudyId')._id });
  }else{
    return {};
  }
};

//------------------------------------------------
// EVENTS

Template.studiesEditPage.events({
  'click #saveStudyButton':function(){
    console.count('click #saveStudyButton');

    var formObject = {
      name: $('#studyNameInput').val(),
      description: $('#studyDescriptionInput').val(),
      url: $('#studyUrlInput').val(),
      createdAt: new Date(),
      owner: Meteor.user().profile.name,
      owner_id: Meteor.userId()
    };

    if(this._id){
      console.count('this._id: ' + this._id);

      var recordId = Studies.update({_id: this._id},{
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id
      });
      // console.log('Studies updated.  Now trying to rename other collections.')
      // Meteor.call('renameStudy', formObject, function(error, result){
      //   if(error){
      //     console.error(error);
      //   }
      //   if(result){
      //     console.log(result);
      //   }
      // });

    }else{
      var recordId = Studies.insert({
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        creator: Meteor.user().profile.name,
        creator_id: Meteor.userId(),
        timestamp: new Date(),
        active: false
      });
      console.log(recordId);


    }
    Router.go('/studies/');
  }
});

Template.studiesEditPage.getStudyName = function(){
  if(this.name){
    return this.name;
  }else{
    return "New Study";
  }
};
