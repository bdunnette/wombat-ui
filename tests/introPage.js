// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Intro Page" : function (client) {
    client
      .url("http://localhost:3000")

      .waitForElementVisible("body", 1000)
      .waitForElementVisible("#entrySignInPage", 1000)
      .waitForElementVisible("#emailInput", 1000)
      .waitForElementVisible("#passwordInput", 1000)
      .waitForElementVisible("#entrySignInButton", 1000)

      .setValue("#emailInput", "janedoe")
      .setValue("#passwordInput", "janedoe")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#navbarHeader", 1000)


      // navbar tests
      .verify.elementPresent('#navbarHeader')
      .verify.elementPresent('#headerNav')
      .verify.elementPresent('#westNavbarHeader')
      .verify.elementPresent('#navbarMenuToggler')
      .verify.elementPresent('#navbarBrandLink')
      .verify.elementPresent('#eastNavHeaderMenu')
      .verify.elementPresent('#northeastDropDown')
      .verify.elementPresent('#northeastDropDownLink')
      .verify.elementPresent('#northeastDropDownMenu')
      .verify.elementPresent('#userProfileLink')
      .verify.elementPresent('#termsOfServiceLink')
      .verify.elementPresent('#privacyPolicyLink')
      .verify.elementPresent('#glossaryLink')
      .verify.elementPresent('#feedbackSupportLink')
      .verify.elementPresent('#logOutLink')

      .waitForElementVisible("#introPage", 1000)
      .verify.elementPresent("#introPageTitle")
      .verify.containsText("#introPageTitle", "Welcome to Thinaire Insights")
      .verify.elementPresent('#introTitleRule')

      // createCampaignTile
      .verify.elementPresent('#createCampaignTile')
      .verify.elementPresent('#createCampaignTileIcon')
      .verify.elementPresent('#createCampaignTileTitle')
      .verify.elementPresent('#createCampaignTileRule')
      .verify.elementPresent('#createCampaignTileText')

      .verify.elementPresent('#addDigitalContentTile')
      .verify.elementPresent('#addDigitalContentTileIcon')
      .verify.elementPresent('#addDigitalContentTileTitle')
      .verify.elementPresent('#addDigitalContentTileRule')
      .verify.elementPresent('#addDigitalContentTileText')

      // .verify.elementPresent('#createNewUserTile')
      // .verify.elementPresent('#createNewUserTileIcon')
      // .verify.elementPresent('#createNewUserTileTitle')
      // .verify.elementPresent('#createNewUserTileRule')
      // .verify.elementPresent('#createNewUserTileText')

      .verify.elementPresent('#zoomInstructions')

      // footer
      .verify.elementPresent('#navbarFooter')

      // click the ThinAire logo, and open the sidebar
      .click("#navbarBrandLink")
      .pause(1000)

      .waitForElementVisible("#sidebarTemplate", 1000)
      .verify.elementPresent('#sidebarNav')
      .verify.elementPresent('#sidebarMenu')
      .verify.elementPresent('#sidebarMenuHomeItem')
      .verify.elementPresent('#sidebarMenuHomeLink')
      .verify.elementPresent('#sidebarMenuCampaignsItem')
      .verify.elementPresent('#sidebarMenuCampaignsLink')
      .verify.elementPresent('#sidebarMenuDigitalContentItem')
      .verify.elementPresent('#sidebarMenuDigitalContentLink')

      .end();
  }
};
