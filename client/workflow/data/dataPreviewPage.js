
Router.map(function(){
  this.route('dataPreviewPage', {
    path: '/data/:id',
    template: 'dataPreviewPage',
    onBeforeAction: function(){
      Session.set('currentDataRecord', this.params.id);
    },
    data: function () {
      console.log('routing to: /data/', this.params.id);
      return Data.findOne({_id: this.params.id});
    },
  });
});
Template.dataPreviewPage.events({
  'click .panel-footer':function(){
    var record = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log( 'clicked on panel footer ', record.previousVersion);
    //TODO this is a hack until I put the link into the anchor tag only
    Session.set('currentDataRecord', record.previousVersion);
    Router.go('/data/' + record.previousVersion);
  },
  'click .fa-trash-o':function(){
   Meteor.call('deleteDataRecord', Session.get('currentDataRecord'));
  },
  'click .fa-lock':function(){
   Meteor.call('lockDataRecord', Session.get('currentDataRecord'));
  }
  });

Template.dataPreviewPage.helpers({
  dataSchema: function(){
    console.log('data.schema', this.schema);
    console.log('selectedDataRecord', Session.get('selectedDataRecord'));
    console.log('currentDataRecord', Session.get('currentDataRecord'));

    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);

    if(dataRecord){
      var form = Forms.findOne(dataRecord.schema_id);
      console.log('form', form);

      if(form){
        return form.schema;
      }else{
        return [];
      }
    }
  },
  getPublishText:function(){
    if(this.stared){
      return 'Unpublish Form';
    }else{
      return 'Publish Form';
    }
  },
  isPublished: function(){
    if(this.stared){
      return true;
    }else{
      return false;
    }
  },
  getFormName: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    //console.log('selectedDataRecord', Session.get('selectedDataRecord'));
    if(dataRecord){
      if(dataRecord.formName){
        return dataRecord.formName;
      }else{
        return "---";
      }
    }else{
      return 'No record.';
    }
  },
   getPreviousVersion: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.previousVersion){
        return dataRecord.previousVersion;
      }else{
        return "Initial Version";
      }
    }else{
      return 'No record.';
    }
  },
  //TODO need to redo this part, not right but works
   isInitialVersion: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.previousVersion){
        return false;
      }else{
        return true;
      }
    }else{
      return 'No record.';
    }
  },

  getCreatedBy: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.ownerUsername){
        return dataRecord.ownerUsername;
      }else{
        return "---";
      }
    }else{
      return 'No record.';
    }
  }
});
