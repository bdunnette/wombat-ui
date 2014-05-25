//--------------------------------------------------------------
// Layout Resizing


UI.body.resized = function(){
  $('#errorPanel').sidebar();
  $('#contextPanel').sidebar();

  return Session.get('resize');
};


//----------------------------------------------
// helper functions

toggleWestPanel = function(){
  if($('body').hasClass('leftSidebar')){
    $('body').removeClass('leftSidebar');
    $('#westPanel').removeClass('active');
  }else{
    $('body').addClass('leftSidebar');
    $('#westPanel').addClass('active');
  }
}
toggleEastPanel = function(){
  if($('body').hasClass('rightSidebar')){
    $('body').removeClass('rightSidebar');
    $('#eastPanel').removeClass('active');
  }else{
    $('body').addClass('rightSidebar');
    $('#eastPanel').addClass('active');
  }
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
  if(!bowser.webkit){
    this.render('browserNotSupportedPage');
    this.pause();
  }
});


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
