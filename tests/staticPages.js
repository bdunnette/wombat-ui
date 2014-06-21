// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Static Pages" : function (client) {
    client
      .url("http://localhost:3000/landing")

      .waitForElementVisible("body", 1000)
      .waitForElementVisible("#landingPage", 1000)

      .verify.elementPresent("#publicHeader")
      .verify.elementPresent("#navBarTitle")
      .verify.elementPresent("#signInButtonLink")
      .verify.elementPresent("#signUpButtonLink")

      .verify.elementPresent("#hero")
      .verify.elementPresent("#features")
      .verify.elementPresent("#developmentTeam")

      .click("#signInButtonLink")
      .pause(1000)

      .waitForElementVisible("#entrySignInPage", 1000)
      .verify.elementPresent("#emailInput")
      .verify.elementPresent("#passwordInput")
      .verify.elementPresent("#entrySignInButton")

      .setValue("#emailInput", "janedoe")
      .setValue("#passwordInput", "janedoe")

      .click("#entrySignInButton")
      .pause(1000)

      // open the menu
      .click("#northeastDropDownLink")
      .pause(100)
      .waitForElementVisible("#northeastDropDownMenu", 100)

      .verify.elementPresent('#userProfileLink')
      .verify.containsText("#userProfileLink", "Profile")

      .verify.elementPresent('#termsOfServiceLink')
      .verify.containsText("#termsOfServiceLink", "Terms of service")

      .verify.elementPresent('#privacyPolicyLink')
      .verify.containsText("#privacyPolicyLink", "Privacy policy")

      .verify.elementPresent('#glossaryLink')
      .verify.containsText("#glossaryLink", "Glossary")

      .verify.elementPresent('#feedbackSupportLink')
      .verify.containsText("#feedbackSupportLink", "Feedback & Support")

      .verify.elementPresent('#logOutLink')
      .verify.containsText("#logOutLink", "Log out")

      // click terms of service
      .click("#termsOfServiceLink")
      .pause(200)
      .waitForElementVisible("#eulaPage", 1000)

      // click privacy policy
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#privacyPolicyLink")
      .pause(200)
      .waitForElementVisible("#privacyPage", 1000)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#glossaryLink")
      .pause(200)
      .waitForElementVisible("#glossaryPage", 1000)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#logOutLink")
      .pause(2000)
      .waitForElementVisible("#entrySignInPage", 1000)
      .end();
  }
};
