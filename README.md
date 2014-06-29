wombat-ui
=========

Clinical Form Builder app for Pharmaceutical Trials Data Collection.

==============================
### Install Meteor Environment

````sh
# install meteor
curl https://install.meteor.com | sh

# check it's installed correctly
meteor --version

# install node and npm
curl http://npmjs.org/install.sh | sh

# check npm is installed correctly
npm -version

# find your npm path
which npm

# make sure npm is in your path
sudo nano ~/.profile
  export PATH=$PATH:/usr/local/bin

# install meteorite
npm install -g meteorite

# and if you have problems with permissions
sudo -H npm install -g meteorite

# check mrt is installed correctly
mrt --version

# find your mrt path
which mrt
locate mrt

# make sure meteorite is in your path
sudo nano ~/.profile
  export PATH=$PATH:/usr/local/share/npm/bin

# check mrt is installed correctly
mrt --version
````

============================
### Install Application

````sh
git clone https://github.com/awatson1978/wombat-ui.git
cd wombat-ui
sudo mrt
````

============================
### Run Acceptance Tests

````sh

# optional:  you may want to reset your application data
terminal-a$ sudo mrt reset

# run your application as usual
terminal-a$ sudo mrt

# then open up a second terminal and run_nightwatch to run all tests
terminal-b$ sudo ./run_nightwatch.sh

# or specify a specific test
terminal-b$ sudo ./run_nightwatch.sh -t tests/homePage.js

````


------------------------
### Licensing

All rights reserved.  Wombat & Co.
