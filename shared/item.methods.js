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
    console.log('dropping Items collection to clear Form Builder...');
    Items.find().forEach(function(record){
      Items.remove({_id: record._id});
    });
  },
  dropDataRecord: function(recordId){
    console.log('removing record', recordId);
    //TODO test for record exists
    Data.update({_id: recordId}, {$set {isDeleted: true}});
    console.log ('flagged record', recordId);
  },
  lockDataRecord: function(recordId){
    console.log('toggling locked status on record', recordId);
    var record = Data.findOne({_id: recordId});
    if(record){
      if(record.locked){
        return Data.update({_id: recordId},{$set:{
          locked: false
        }});
      }else{
        return Data.update({_id: recordId},{$set:{
          locked: true
        }});
      }
    }else{
      return 'Update failed.';
    }
  },
  approveDataRecord: function(recordId){
    console.log('toggling approved status on record', recordId);
    var record = Data.findOne({_id: recordId});
    if(record){
      if(record.approved){
        return Data.update({_id: recordId},{$set:{
          approved: false
        }});
      }else{
        return Data.update({_id: recordId},{$set:{
          approved: true
        }});
      }
    }else{
      return 'Update failed.';
    }
  }
});
