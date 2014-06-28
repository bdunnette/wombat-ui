//-------------------------------------------------------------------------
// USER ACCOUNTS

if (Meteor.users.find().count() === 0) {
  if(process.env.ROOT_URL == "http://localhost"){
    console.log("Running on localhost and no users found.  Lets create some.");

    var users = [{
        email: "admin@wombat.com",
        username: "sysadmin",
        name: "System Admin",
        password: "sysadmin321$",
        roles: ["employee", "admin", "coordinator", "reviewer", "builder"]
      }, {
        email: "janedoe@wombat.com",
        username: "janedoe",
        name: "Jane Doe",
        password: "janedoe123",
        roles: ["employee", "builder", "coordinator"]
      },{
        email: "johndoe@wombat.com",
        username: "johndoe",
        name: "John Doe",
        password: "johndoe123",
        roles: ["employee", "reviewer"]
      }
    ];

    users.forEach(function(user){
      console.log('----------------------------')
      console.log('newUser: ', user);
      var id = Accounts.createUser({
          email: user.email,
          password: user.password,
          profile: {
              name: user.name
          },
          username: user.username
      });

      if(user.roles.length > 0){
        Roles.addUsersToRoles(id, user.roles);
      }

      console.log('createdUser: ', Meteor.users.findOne({_id: id}));
    });

    console.log("Users created: " + Meteor.users.find().count());
  }
  console.log("No users detected; but not running on localhost.  Skipping initialize of default users.");
}


//-------------------------------------------------------------------------
// USER ACCOUNTS
