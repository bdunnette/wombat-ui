// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  "Users Workflow" : function (client) {
    client
      .url("http://localhost:3000")

      // signin to Inisights as sysadmin
      .waitForElementVisible("#entrySignInPage", 1000)
        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")
      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin")
      .click("#entrySignInButton")
      .pause(1000)


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
        .verify.elementPresent('#sidebarMenuUsersItem')
        .verify.elementPresent('#sidebarMenuUsersLink')
        .verify.elementPresent('#sidebarMenuClientsItem')
        .verify.elementPresent('#sidebarMenuClientsLink')

      .click("#sidebarMenuUsersLink")
      .pause(1000)


      // test that the page contains search and control elements
      .waitForElementVisible("#usersListPage", 1000)
        .verify.elementPresent('#usersListPageTitle')
        .verify.containsText("#usersListPageTitle", "Users")

        .verify.elementPresent('.searchColumn')
        .verify.elementPresent('#usersSearchInput')
        .verify.containsText("#usersSearchInput", "")

        .verify.elementPresent('.newRecordColumn')
        .verify.elementPresent('#newUserButton')
        .verify.containsText("#newUserButton", "NEW USER")

      // test the table
      .verify.elementPresent('#usersTable')
        .verify.elementPresent('#usersTableUsernameColumn')
        .verify.containsText("#usersTableUsernameColumn", "Username")
        .verify.elementPresent('#usersTableCreatedAtColumn')
        .verify.containsText("#usersTableCreatedAtColumn", "CreatedAt")
        .verify.elementPresent('#usersTableFullNameColumn')
        .verify.containsText("#usersTableFullNameColumn", "Full Name")
        .verify.elementPresent('#usersTableRoleColumn')
        .verify.containsText("#usersTableRoleColumn", "Role")
        .verify.elementPresent('#usersTableCompanyColumn')
        .verify.containsText("#usersTableCompanyColumn", "Company")
        .verify.elementPresent('#usersTableEmailColumn')
        .verify.containsText("#usersTableEmailColumn", "Email")


      // test searching for 'sysadmin' username
      .setValue("#usersSearchInput", "sysadmin")

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child img')
        .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'img-circle')
        .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'avatar')
        .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'hidden-phone')
        .verify.attributeEquals('#usersTable .userListItem:first-child td:first-child img', 'src', 'http://localhost:3000/images/icons/Default_User.png')

        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(1)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(2)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(3)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(4)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(5)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(6)')

        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'sysadmin')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', '2014')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'System Administrator')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'SysAdmin')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'Thinaire')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'sysadmin@thinaire.net')


      // test searching for 'sysadmin' username
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", "johndoe")
      .pause(50)

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'johndoe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', '2014')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'John Doe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'User')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'ACME, Inc')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'johndoe@acme.com')

      // test searching for 'sysadmin' username
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", "janedoe")
      .pause(50)

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'janedoe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', '2014')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'Jane Doe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'User')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'Thinaire')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'janedoe@thinaire.net')

      .click("#newUserButton")
      .pause(1000)

      // userEditPage
      .waitForElementVisible("#userEditPage", 1000)
      .pause(100)
      .verify.visible('#userEditPageTitle')
      .verify.containsText("#userEditPageTitle", "New User")

      .verify.visible('#userEditForm')

      .verify.visible('#userAvatarImage')
      .verify.cssClassPresent('#userAvatarImage', 'img-circle')
      .verify.cssClassPresent('#userAvatarImage', 'avatar')
      .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')


      .verify.visible('#profileUsernameLabel')
      .verify.visible('#profileEmailLabel')
      .verify.visible('#profileNameLabel')
      .verify.visible('#profileTitleLabel')
      .verify.visible('#findCompanyButton')
      .verify.visible('#findRoleButton')
      .verify.visible('#profileAvatarLabel')
      .verify.visible('#profilePhoneLabel')
      .verify.visible('#profileWebsiteLabel')
      .verify.visible('#profileAddressLabel')
      .verify.visible('#profileCityLabel')
      .verify.visible('#profileStateLabel')
      .verify.visible('#profileZipLabel')

      .verify.visible('#profileUsernameInput')
      .verify.visible('#profileEmailInput')
      .verify.visible('#profileNameInput')
      .verify.visible('#profileTitleInput')
      .verify.visible('#findCompanyButton')
      .verify.visible('#findRoleButton')
      .verify.visible('#profileAvatarInput')
      .verify.visible('#profilePhoneInput')
      .verify.visible('#profileWebsiteInput')
      .verify.visible('#profileAddressInput')
      .verify.visible('#profileCityInput')
      .verify.visible('#profileStateInput')
      .verify.visible('#profileZipInput')

      .verify.containsText('#profileUsernameInput', "")
      .verify.containsText('#profileEmailInput', "")
      .verify.containsText('#profileNameInput', "")
      .verify.containsText('#profileTitleInput', "")
      .verify.containsText('#findCompanyButton', "No profile.")
      .verify.containsText('#findRoleButton', "No role set?")
      .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
      .verify.containsText('#profilePhoneInput', "")
      .verify.containsText('#profileWebsiteInput', "")
      .verify.containsText('#profileAddressInput', "")
      .verify.containsText('#profileCityInput', "")
      .verify.containsText('#profileStateInput', "")
      .verify.containsText('#profileZipInput', "")




      .end();
  }
};
