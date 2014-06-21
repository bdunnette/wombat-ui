// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Sign In Page" : function (client) {
    client
      .url("http://localhost:3000")

      .waitForElementVisible("body", 1000)
      .waitForElementVisible("#entrySignInPage", 1000)
      .waitForElementVisible("#emailInput", 1000)
      .waitForElementVisible("#passwordInput", 1000)
      .waitForElementVisible("#entrySignInButton", 1000)

      .verify.elementPresent('#entrySignInPage')
      //.verify.elementPresent('#thinaireSignInLogo')
      .verify.elementPresent('#emailInput')
      .verify.elementPresent('#passwordInput')
      .verify.elementPresent('#signInLabel')
      .verify.elementPresent('#forgotPasswordLink')
      .verify.elementPresent('#entrySignInButton')

      .setValue("#emailInput", "janedoe")
      .setValue("#passwordInput", "janedoe")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#introPage", 1000)
      .verify.containsText("#introPageTitle", "Welcome to Thinaire Insights")
      .end();
  }
};
