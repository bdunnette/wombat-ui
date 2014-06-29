// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Static Pages" : function (client) {
    client
      .url("http://localhost:3000")

      .waitForElementVisible("body", 1000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)

      .waitForElementVisible("#entrySignInPage", 1000)
      .verify.elementPresent("#emailInput")
      .verify.elementPresent("#passwordInput")
      .verify.elementPresent("#entrySignInButton")

      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#homePage", 1000)


      // studies
      .click("#studiesLink")
      .pause(500)
      .verify.elementPresent("#studiesListPage")

      // forms
      .click("#savedFormLink")
      .pause(500)
      .verify.elementPresent("#formsListPage")

      // data
      .click("#collectedDataLink")
      .pause(500)
      .verify.elementPresent("#dataListPage")

      // design
      .click("#newFormLink")
      .pause(500)
      .verify.elementPresent("#builderPage")

      // clients
      .click("#clientsLink")
      .pause(500)
      .verify.elementPresent("#clientsListPage")

      // users
      .click("#usersLink")
      .pause(500)
      .verify.elementPresent("#usersListPage")



      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(2000)
      .waitForElementVisible("#landingPage", 1000)
      .end();
  }
};
