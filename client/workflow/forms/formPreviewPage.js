
Router.map(function(){
  this.route('formPreviewPage', {
    path: '/form/:id',
    template: 'formPreviewPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    data: function () {
      console.log('routing to: ', this.params.id);
      return Forms.findOne({_id: this.params.id});
    },
  });
});
Template.formPreviewPage.events({
  'click #formEditButton':function(){
    Router.go('/builder/' + this._id);
  },
  'click #formDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Forms.remove({_id: this._id});
      Router.go('/');
    }
  },
  'click #formPublishButton':function(){
    if(this.stared){
      Forms.update({_id: this._id},{$set:{
        stared: false
      }});
    }else{
      Forms.update({_id: this._id},{$set:{
        stared: true
      }});
    }
  }
});

Template.formPreviewPage.helpers({
  formSchema: function(){
    console.log('form.schema', this.schema);
    var form = Forms.findOne(Session.get('currentForm'));
    if(form){
      return form.schema;
    }else{
      return [];
    }
  },
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
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
  }
});
