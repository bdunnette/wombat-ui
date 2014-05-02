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
  }
});
