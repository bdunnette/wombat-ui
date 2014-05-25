Template.homePage.events({
  'click #fomrBuilderTile':function(){
    Router.go('/builder');
  },
  'click #savedFormsTile':function(){
    Router.go('/forms');
  },
  'click #collectedDataTile':function(){
    Router.go('/builder');
  }
});
