Session.setDefault('receivedData', false);
Session.setDefault('accountSearchFilter', '');
Session.setDefault('tableLimit', 20);
Session.setDefault('paginationCount', 1);
Session.setDefault('selectedPagination', 0);
Session.setDefault('skipCount', 0);

// Meteor.autorun(function(){
//   Meteor.subscribe('customerAccounts');
// });

//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('dataListPage', {
    path: '/data',
    template: 'dataListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    onBeforeAction: function() {
      setPageTitle("Forms");
    },
    waitOn: function(){
      return Meteor.subscribe('data');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.dataListPage.helpers({
  dataList: function(){
    Session.set('receivedData', new Date());
    Session.set('paginationCount', Math.floor(Forms.find().count() / Session.get('tableLimit')));
    //return Data.find({},{limit: Session.get('tableLimit'), skip: Session.get('skipCount')});
    return Data.find();

    // return CustomerAccounts.find({$or:[
    //   {FirstName: { $regex: Session.get('accountSearchFilter'), $options: 'i' }},
    //   {LastName: { $regex: Session.get('accountSearchFilter'), $options: 'i' }}
    //   ]
    // },{limit: Session.get('tableLimit'), skip: Session.get('skipCount')});
  },
  rendered: function(){
    $(this.find('#example')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#example").trigger("update");
      }, 200);
    });
  }
});




Template.dataListPage.events({
  'keyup #searchInput':function(){
    Session.set('accountSearchFilter', $('#searchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('tableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('tableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('tableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('selectedPagination', this.index);
    Session.set('skipCount', this.index * Session.get('tableLimit'));
  },
  'click .customerRow':function(){
    Session.set('selectedUser', this._id);
    Router.go('/form/' + this._id);
    //alert(this._id);
  }
});


Template.dataListPage.helpers({
  getPaginationCount: function(){
    return Session.get('paginationCount');
  },
  dataPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('paginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('tableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('tableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('tableLimit') === 100){
      return "active";
    }
  }
});



Template.dataPaginationButton.helpers({
  pageActive: function(){
    if(this.index === Session.get('selectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});


Template.dataRowItem.events({
  'click .fa-star':function(){
    Forms.update({_id: this._id}, {$set:{
      'stared':false
    }});
  },
  'click .fa-star-o':function(){
    Forms.update({_id: this._id}, {$set:{
      'stared':true
    }});

  }
});

Template.dataRowItem.helpers({
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
