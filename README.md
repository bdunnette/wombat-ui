clinical-trials
=========

HIPAA compliant data collection application for use in Clinical Trials.

==============================
#### Install Meteor Environment

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
#### Install Application

````sh
git clone https://github.com/awatson1978/clinical-trials.git
cd clinical-trials
sudo mrt
````

============================
#### Run Acceptance Tests

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

============================
#### HIPAA Compliance  


````
meteor add force-ssl
````

============================
#### Clinical Trial Protocol Templates  

[Phase III Trials Protocol Template (NIH - Neurological Disorders and Stroke)](http://www.ninds.nih.gov/research/clinical_research/toolkit/protocol.htm)  
[Clinical Trials Protocol Templates (NIH - Allergy and Infection Diseases)](http://www.niaid.nih.gov/labsandresources/resources/toolkit/protocol/Pages/protocol.aspx)  
[Interventional Clinical Protocol Template (NIH - Dental and Craniofacial Research)](http://www.nidcr.nih.gov/Research/ToolsforResearchers/Toolkit/InterventionProtocolTemplate.htm)  


============================
#### Clinical Trial Protocol Examples  

[Rimonabant 20mg for reducing cardiovascular events (Phase III)](http://www.stsiweb.org/images/uploads/CRESCENDOfinal.pdf_.pdf)  
[Modafinil for Cocain Dependence (Phae II)](http://www.med.upenn.edu/ocr/protocol/sample/sample.html)  

[Inclusion and Exclusion Criteria](http://www.unm.edu/~rrobergs/604Lect2.pdf)  



============================
#### Other Resources

https://clinicaltrials.gov/



------------------------
### Licensing

MIT.  Use as you will.
