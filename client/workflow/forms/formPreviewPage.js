
Router.map(function(){
  this.route('formPreviewPage', {
    path: '/form/:id',
    template: 'formPreviewPage',
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return Forms.findOne({_id: this.params.id});
    },
  });
});
Template.formPreviewPage.events({
  'click #formEditButton':function(){
    Router.go('/edit_form/' + this._id);
  },
  'click #formDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this.FirstName + " " + this.LastName + "?")){
      Forms.remove({_id: this._id});
      Router.go('/');
    }
  }
});
