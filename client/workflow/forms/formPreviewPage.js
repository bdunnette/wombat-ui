
Router.map(function(){
  this.route('formPreviewPage', {
    path: '/form/:id',
    template: 'formPreviewPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
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
    if(confirm('Are you sure you want to delete ' + this.FirstName + " " + this.LastName + "?")){
      Forms.remove({_id: this._id});
      Router.go('/');
    }
  }
});

Template.formPreviewPage.helpers({
  formSchema: function(){
    console.log('form.schema', this.schema);
    var form = Forms.findOne(Session.get('currentForm'));
    if(form.schema){
      return form.schema;
    }else{
      return [];
    }
  }
});
