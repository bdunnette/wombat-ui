Session.setDefault('selectedBuilderTab','addNewFieldTab');

Template.westPanel.events({
  'click #deleteBlockButton':function(){
    Items.remove(Session.get('selectedBlockItem'));
    Session.set('selectedBuilderTab','addNewFieldTab');
    Session.set('selectedBlockItem', false);
  },
  'click #saveFormBlockParamsButton':function(){
    Items.update({_id: Session.get('selectedBlockItem') }, {$set:{
        labelText: $('#questionInput').val(),
        inputValue: $('#defaultValueInput').val()
    }});
  },

  'click #textInputBlock':function(){
    Session.set('movedElementId', 'textInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #textareaInputBlock':function(){
    Session.set('movedElementId', 'textareaInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #numericInputBlock':function(){
    Session.set('movedElementId', 'numericInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #spacerBlock':function(){
    Session.set('movedElementId', 'spacerBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #sectionTitleBlock':function(){
    Session.set('movedElementId', 'sectionTitleBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #yesNoInputBlock':function(){
    Session.set('movedElementId', 'yesNoInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },

  'click #addNewFieldTab':function(){
    Session.set('selectedBuilderTab','addNewFieldTab');
    console.log(Session.get('selectedBuilderTab'));
  },
  'click #editFieldTab':function(){
    if(Session.get('selectedBlockItem')){
      Session.set('selectedBuilderTab','editFieldTab');
      console.log(Session.get('selectedBuilderTab'));
    }
  }
});


Template.westPanel.helpers({
  selectedFormBlock: function(){
    return Items.findOne(Session.get('selectedBlockItem'));
  },
  getQuestionText:function(){
    return this.labelText;
  },
  getDefaultValue: function(){
    return this.inputValue;
  },
  addNewFieldTabActive: function(){
    if(Session.equals('selectedBuilderTab', 'addNewFieldTab')){
      return "active";
    }else{
      return "";
    }
  },
  editFieldTabActive: function(){
    if(Session.equals('selectedBuilderTab', 'editFieldTab')){
      return "active";
    }else{
      return "";
    }
  },
  isAddNewFieldTab: function(){
    if(Session.get('selectedBuilderTab') === 'addNewFieldTab'){
      return true;
    }else{
      return false;
    }
  }

});
