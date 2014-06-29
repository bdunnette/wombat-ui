Session.setDefault('selectedBlockItem', false);

Router.map(function(){
  this.route('builderPage', {
    path: '/builder/:id',
    template: 'builderPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return Forms.findOne({_id: this.params.id});
    },
    onAfterAction:function(){
      showSidebars();
    }
  });
  this.route('builderPage', {
    path: '/builder',
    template: 'builderPage',
    onBeforeAction: function(){
      Session.set('currentForm', false);
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return {};
    },
    onAfterAction:function(){
      showWestPanel();
    }
  });
});



Template.builderPage.events({
  'click .close':function(){
    Items.remove(this._id);
  },
  'click .item':function(){
    Session.set('selectedBuilderTab','editFieldTab');
    Session.set('selectedBlockItem', this._id);
    console.log('selectedBuilderTab', Session.get('selectedBuilderTab'));
  },
  'click .yes-button':function(){
    Session.set('selectedBlockItem', this._id);
    alert('Form not activated yet.');
    // alert('yes: ' + this._id);
  },
  'click .no-button':function(){
    Session.set('selectedBlockItem', this._id);
    // alert('no: ' + this._id);
    alert('Form not activated yet.');
  }

});

Template.builderPage.helpers({
  // resized: function(){
  //   $('#builderPage').css('width', window.innerWidth - 275);
  //   return Session.get('resized');
  // },
  items: function(){
    return Items.find({}, { sort: { rank: 1 } });
  },
  formName: function(){
    var currentForm = Forms.findOne(Session.get('currentForm'));

    if(currentForm){
      console.log('currentForm', currentForm);
      return currentForm.formName;
    }else{
      return "";
    }
  },
  rendered: function () {
    $(this.find('#list')).sortable({ // uses the 'sortable' interaction from jquery ui
      stop: function (event, ui) { // fired when an item is dropped
        var el = ui.item.get(0);
        var before = ui.item.prev().get(0);
        var after = ui.item.next().get(0);

        var newRank;
        if (!before) { // moving to the top of the list
          newRank = SimpleRationalRanks.beforeFirst(UI.getElementData(after).rank);

        } else if (!after) { // moving to the bottom of the list
          newRank = SimpleRationalRanks.afterLast(UI.getElementData(before).rank);

        } else {
          newRank = SimpleRationalRanks.between(
            UI.getElementData(before).rank,
            UI.getElementData(after).rank);
        }
        Items.update(UI.getElementData(el)._id, {$set: {rank: newRank}});
      }
    });

    $('#sortableDropZone').droppable({
      accept: ".dragDropBlock",
      activeClass: 'visible',
      drop: function(){
        addBlockToForm();
        setTimeout(function(){
          Session.clear('movedElementId');
        }, 100);

      }
    });
  }
});


addBlockToForm = function(){
  Session.set('selectedBuilderTab','addNewFieldTab');

  var inputType = "text";
  var elementType = "input";
  var labelText = "";
  var text = "";

  if(Session.get('movedElementId') === "colorInputBlock"){
    inputType = "color";
    elementType = "color";
  }else if(Session.get('movedElementId') === "numericInputBlock"){
    labelText = "Q: Lorem numberum...";
    inputType = "number";
    elementType = "input";
  }else if(Session.get('movedElementId') === "textareaInputBlock"){
    labelText = "Q: Lorem textum...";
    elementType = "textarea";
  }else if(Session.get('movedElementId') === "textInputBlock"){
    labelText = "Q: Lorem textae...";
    elementType = "input";
    //inputValue = "ipsum dolar sit amet...";
  }else if(Session.get('movedElementId') === "spacerBlock"){
    inputType = "spacer";
    elementType = "spacer"
  }else if(Session.get('movedElementId') === "yesNoInputBlock"){
    elementType = "yesno";
    inputType = "yesno";
  }else if(Session.get('movedElementId') === "sectionTitleBlock"){
    labelText = "Section ipsum...";
    inputType = "section";
    elementType = "section";
  }

  var lastRank = 0;
  Items.find().forEach(function(doc){
    if(doc.rank > lastRank){
      lastRank = doc.rank + 1;
    }
  });

  var newObject = {
    block_type: Session.get('movedElementId'),
    rank: lastRank,
    inputType: inputType,
    inputValue: '',
    elementType: elementType,
    labelText: labelText,
    text: text,
    rank: Items.find().count() + 1
  };
  console.log('newObject', newObject);

  return Items.insert(newObject);
}
