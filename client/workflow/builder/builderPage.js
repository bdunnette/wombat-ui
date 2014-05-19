Session.setDefault('selectedBlockItem', false);

Router.map(function(){
  this.route('builderPage', {
    path: '/builder/:id',
    template: 'builderPage',
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return Forms.findOne({_id: this.params.id});
    },
  });
  this.route('builderPage', {
    path: '/builder',
    template: 'builderPage',
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return {};
    },
  });
});




Template.builderPage.events({
  'click .close':function(){
    Items.remove(this._id);
  },
  'click .item':function(){
    Session.set('selectedBlockItem', this._id);
  }
});

Template.builderPage.helpers({
  items: function(){
      return Items.find({}, { sort: { rank: 1 } });
  },
  rendered: function () {
    $(this.find('#list')).sortable({ // uses the 'sortable' interaction from jquery ui
      stop: function (event, ui) { // fired when an item is dropped
        var el = ui.item.get(0), before = ui.item.prev().get(0), after = ui.item.next().get(0);

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
        //$('#' + Session.get('movedElementId')).appendTo("#" + this.id);
        //$('#' + Session.get('movedElementId')).appendTo("#sortableListPanel");
        // $('#' + Session.get('movedElementId')).css('top', '0');
        // $('#' + Session.get('movedElementId')).css('left', '0');
        var inputType = "text";
        var elementType = "input";
        if(Session.get('movedElementId') === "colorInputBlock"){
          inputType = "color";
        }else if(Session.get('movedElementId') === "numericInputBlock"){
          inputType = "number";
        }else if(Session.get('movedElementId') === "textareaInputBlock"){
          elementType = "textarea"
        }

        var rank = 0;
        Items.find().forEach(function(doc){
          if(doc.rank > rank){
            rank = doc.rank + 1;
          }
        });



        setTimeout(function(){
          Items.insert({
            text: Session.get('movedElementId'),
            rank: rank,
            inputType: inputType,
            elementType: elementType
          });
          Session.clear('movedElementId');
        }, 50);
      }
    });
  }
});
