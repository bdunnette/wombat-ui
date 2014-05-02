Template.eastPanel.events({
  'click #saveFormBlockParamsButton':function(){
    // var data = {
    //   id: Session.get('selectedBlockItem'),
    //   labelText: $('#questionInput').val(),
    //   inputValue: $('#defaultValueInput').val()
    // };
    //
    // Meteor.call('updateItem', data, function(error, result){
    //   if(error){
    //     console.error(error);
    //   }
    // });

    Items.update({_id: Session.get('selectedBlockItem') }, {$set:{
        labelText: $('#questionInput').val(),
        inputValue: $('#defaultValueInput').val()
    }});


  }
});
Template.eastPanel.helpers({
  selectedFormBlock: function(){
    return Items.findOne(Session.get('selectedBlockItem'));
  },
  getQuestionText:function(){
    return this.labelText;
  },
  getDefaultValue: function(){
    return this.inputValue;
  }
});
