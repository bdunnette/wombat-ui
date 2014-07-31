Session.setDefault('selectedBuilderTab','addNewFieldTab');

Template.westPanel.events({
  'click #deleteBlockButton':function(){
    Items.remove(Session.get('selectedBlockItem'));
    Session.set('selectedBuilderTab','addNewFieldTab');
    Session.set('selectedBlockItem', false);
  },
  'click #saveFormBlockParamsButton':function(){
    var newObject = {
        labelText: $('#questionInput').val(),
        inputValue: $('#defaultValueInput').val(),
    };
    if(Session.get('selectedBlockType') === 'radioInputBlock'){
        newObject.defaultValue1 = $('#defaultValueInput1').val();
        newObject.defaultValue2 = $('#defaultValueInput2').val();
        newObject.defaultValue3 = $('#defaultValueInput3').val();
        newObject.defaultValue4 = $('#defaultValueInput4').val();
        newObject.defaultValue5 = $('#defaultValueInput5').val();
    }
    Items.update({_id: Session.get('selectedBlockItem') }, {$set: newObject});
  },
  'click #duplicateFormBlockButton':function(){
    Session.set('selectedBlockType', this.block_type);
    Session.set('movedElementId', this.block_type);
    Session.set('selectedBlockItem', addBlockToForm(this));
    Session.set('selectedBuilderTab','editFieldTab');
  },

  'click #plainTextBlock':function(){
    Session.set('selectedBlockType', 'plainTextBlock');
    Session.set('movedElementId', 'plainTextBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #textInputBlock':function(){
    Session.set('selectedBlockType', 'textInputBlock');
    Session.set('movedElementId', 'textInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #textareaInputBlock':function(){
    Session.set('selectedBlockType', 'textareaInputBlock');
    Session.set('movedElementId', 'textareaInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #numericInputBlock':function(){
    Session.set('selectedBlockType', 'numericInputBlock');
    Session.set('movedElementId', 'numericInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #spacerBlock':function(){
    Session.set('selectedBlockType', 'spacerBlock');
    Session.set('movedElementId', 'spacerBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #sectionTitleBlock':function(){
    Session.set('selectedBlockType', 'sectionTitleBlock');
    Session.set('movedElementId', 'sectionTitleBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #yesNoInputBlock':function(){
    Session.set('selectedBlockType', 'yesNoInputBlock');
    Session.set('movedElementId', 'yesNoInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','editFieldTab');
  },
  'click #dateTimeInputBlock':function(){
    Session.set('selectedBlockType', 'dateTimeInputBlock');
    Session.set('movedElementId', 'dateTimeInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','dateTimeInputBlock');
  },
  'click #timeInputBlock':function(){
    Session.set('selectedBlockType', 'timeInputBlock');
    Session.set('movedElementId', 'timeInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','timeInputBlock');
  },
  'click #radioInputBlock':function(){
    Session.set('selectedBlockType', 'radioInputBlock');
    Session.set('movedElementId', 'radioInputBlock');
    Session.set('selectedBlockItem', addBlockToForm());
    Session.set('selectedBuilderTab','radioInputBlock');
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


  getValue1: function(){
    return this.defaultValue1;
  },
  getValue2: function(){
    return this.defaultValue2;
  },
  getValue3: function(){
    return this.defaultValue3;
  },
  getValue4: function(){
    return this.defaultValue4;
  },
  getValue5: function(){
    return this.defaultValue5;
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
  },
  hasDefaultValue: function(){
    if(Session.get('selectedBlockType') === 'plainTextBlock'){
      return false;
    }else if(Session.get('selectedBlockType') === 'radioInputBlock'){
      return false;
    }else{
      return true;
    }
  },
  hasMultipleValues: function(){
    if(Session.get('selectedBlockType') === 'plainTextBlock'){
        return false;
    }else if(Session.get('selectedBlockType') === 'radioInputBlock'){
        return true;
    }else{
      return false;
    }
  }

});
