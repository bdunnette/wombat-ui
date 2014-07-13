Session.setDefault('resize', null);

Meteor.startup(function(){
  // if(Meteor.userId()){
  //   removeWallpaper();
  // }else{
  //   setWallpaper();
  // }

  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });

  bowser = BrowserObserver.init();
});
