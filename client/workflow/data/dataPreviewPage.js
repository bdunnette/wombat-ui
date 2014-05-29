
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
    Session.set('selectedDataRecord', record.previousVersion);
    Router.go('/data/' + record.previousVersion);
  }
});

Template.dataPreviewPage.helpers({
  dataSchema: function(){
    console.log('data.schema', this.schema);
    console.log('selectedDataRecord', Session.get('selectedDataRecord'));

    var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
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
    var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
    console.log('dataRecord', dataRecord);
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
  getCreatedBy: function(){
    var dataRecord = Data.findOne({_id: Session.get('selectedDataRecord')});
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
