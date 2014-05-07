Forms =  new Meteor.Collection("forms");
Forms.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});


// TODO:  refactor Items to FormItems
Items = new Meteor.Collection("items");
Items.allow({
  update: function(){
    return true;
  },
  insert: function(){
    return true;
  },
  remove: function(){
    return true;
  }
})

if (Meteor.isServer) {
  if (Items.find().count() === 0) {
    _.each(
      ["penecillin", "vitamin d", "tetracycline", "epinephrine", "peptol bismol", "claritin", "dihydrogen monoxide", "asprin"],
      function (text, index) {
        Items.insert({
          text: text,
          rank: index,
          labelText: text,
          inputValue: "",
          inputType: "text",
          inputPlaceholder: "...",
          elementType: 'input'
        });
      });
  }
}
