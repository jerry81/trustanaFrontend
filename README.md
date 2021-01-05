# simple vue js + element ui 

this is the frontend application for a full stack exercise.

### running instructions

step 1: clone the project https://github.com/jerry81/trustanaKoaJs

step 2: run the above project following the readme (prerequisites is docker desktop installed)

step 3: docker-compose up

step 4: open a chrome browser with --disable-web-security flag or safari browser with cross-origin checks disabled and browse to localhost:8080

### user profile explanation

with an empty mongo db, the user has not been created yet and an empty user profile is shown.

1.  click "create user" to enter user info
2.  the password represents the decryption token that will be used to decrypt that user's data
3.  a resume can be uploaded (password must be entered for this to work) and clicking the upload now button loads the file into the db
4.  clicking save will link the user to the resume file that was uploaded in the previous step
5.  back at the user profile link, enter the password and click decrypt to decrypt the user's profile data
6.  the resume caan be downloaded from the edit form as well
7.  while in the form, the password entered at the start page will be used as the decryption key

### exercise 2 explaination 

1.  enter a secret string to be encrypted and click the button next to it to store it to the database encrypted
2.  click generate token with the options of single use or with an expiration date 
3.  copy the token url into the reterive string with token box
4.  the result is displayed (including errors)

### TODO

1.  cypress e2e tests
2.  deployment (dockerfile, k8s yml) UPDATE 1/5 DONE
