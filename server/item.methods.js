Meteor.methods({
  updateItem: function(data){
    console.log('updating item ' + data.id);
    console.log(data);

    var result = Items.update({_id: data.id }, {$set:{
        labelText: data.labelText,
        inputValue: data.inputValue
    }});
    console.log('result: ' + result);
    return result;
  },
  dropForm: function(){
    Items.find().forEach(function(record){
      Items.remove({_id: record._id});
    });
  }
});
