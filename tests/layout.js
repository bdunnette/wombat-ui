// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "App Layout" : function (client) {
    client
      .url("http://localhost:3000")
      .waitForElementVisible("body", 1000)
      .assert.elementPresent('#promptModal')
      .assert.elementPresent('#confirmModal')
      .assert.elementPresent('#keybindingsModal')
      .assert.elementPresent('#clientSearchModal')
      .assert.elementPresent('#campaignSearchModal')
      .assert.elementPresent('#selectRoleModal')
      .assert.elementPresent('#westPanel')
      .assert.elementPresent('#eastPanel')
      .assert.elementPresent('#mainPanel')
      .assert.elementPresent('#navbarHeader')
      .assert.elementPresent('#mainPanel')
      .end();
  }
};
