//--------------------------------------------------------------
// Layout Resizing


UI.body.resized = function(){
  $('#errorPanel').sidebar();
  $('#contextPanel').sidebar();

  return Session.get('resize');
};


//----------------------------------------------
// sidebar toggle functions

toggleWestPanel = function(){
  if($('body').hasClass('leftSidebar')){
    hideWestPanel();
  }else{
    showWestPanel();
  }
}
showWestPanel = function(){
  $('body').addClass('leftSidebar');
  $('#westPanel').addClass('active');
}
hideWestPanel = function(){
  $('body').removeClass('leftSidebar');
  $('#westPanel').removeClass('active');
}

// toggleEastPanel = function(){
//   if($('body').hasClass('rightSidebar')){
//     $('body').removeClass('rightSidebar');
//     $('#eastPanel').removeClass('active');
//   }else{
//     $('body').addClass('rightSidebar');
//     $('#eastPanel').addClass('active');
//   }
// }
toggleSidebars = function(){
  if(Meteor.user()){
    toggleWestPanel();
    //toggleEastPanel();
  }
}
showSidebars = function(){
  if(!$('body').hasClass('leftSidebar')){
    $('body').addClass('leftSidebar');
    $('#westPanel').addClass('active');
    $('#navbarHeader').addClass('sidebar-compensation');
    $('#navbarHeader').removeClass('no-sidebar-compensation');
    $('#mainPanel').addClass('sidebar-compensation');
    $('#mainPanel').removeClass('no-sidebar-compensation');
  }

  // if(!$('body').hasClass('rightSidebar')){
  //   $('body').addClass('rightSidebar');
  //   $('#eastPanel').addClass('active');
  // }
}
hideSidebars = function(){
  if($('body').hasClass('leftSidebar')){
    //$('body').removeClass('leftSidebar');
    $('#westPanel').removeClass('active');
    $('#navbarHeader').removeClass('sidebar-compensation');
    $('#navbarHeader').addClass('no-sidebar-compensation');
    $('#mainPanel').removeClass('sidebar-compensation');
    $('#mainPanel').addClass('no-sidebar-compensation');
  }
  // if($('body').hasClass('rightSidebar')){
  //   $('body').removeClass('rightSidebar');
  //   $('#eastPanel').removeClass('active');
  // }
}


//--------------------------------------------------------------
// Template.errorPanel

Template.errorPanel.getErrorMessage = function(){
  return "Error Message!";
};


//--------------------------------------------------------------
// Routing Layouts

Router.configure({
  layoutTemplate: 'appLayout',
  notFoundTemplate: 'notFoundPage',
  loadingTemplate: 'loadingPage',
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    }
  }
});
Router.onBeforeAction(function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    this.redirect('/sign-in');
  }
}, {
  except: [
    'homePage',
    'landingRoute',
    'entrySignUpRoute',
    'entrySignInRoute',
    'eulaRoute',
    'privacyRoute',
    'aboutRoute',
    'glossaryRoute',
    'browserNotSupportedRoute',
    'pageNotFoundRoute',
    'entryForgotPasswordRoute',
    'entrySignOutRoute',
    'entryResetPasswordRoute'
  ]
});
Router.onBeforeAction(function() {
  hideWestPanel();
}, {except: ['builderPage']});

// Router.onBeforeAction(function() {
//   if(!bowser.webkit){
//     this.render('browserNotSupportedPage');
//     this.pause();
//   }
// });


//--------------------------------------------------------------
// Routing Layout Helper Functions

setPageTitle = function(newTitle) {
  document.title = newTitle;
};
checkBrowserIsSupported = function(scope) {
  console.log('checkBrowserIsSupported');
  if(!bowser.webkit){
    scope.render('browserNotSupportedPage');
    scope.pause();
  }
};

checkUserHasEmployer = function(scope) {
  console.log('checkUserHasEmployer');
  if (Meteor.user()) {
    if (!Meteor.user().profile.employer_id) {
      scope.render("noEmployerSetPageErrorPage");

      scope.render("navbarHeader", {to: 'header'});
      //scope.render("sidebarTemplate",{to: 'aside'});
      scope.pause();
    } else {
      scope.render("navbarHeader", {to: 'header'});
      //scope.render("sidebarTemplate",{to: 'aside'});
      scope.pause();
    }
  }
};

getYieldTemplates = function() {
  if (Meteor.userId()) {
    return {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
      //'sidebarTemplate': {to: 'aside'}
    };
  } else {
    return {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }

      //'sidebarTemplate': {to: 'aside'}
    };
    //return {};
  }
};
