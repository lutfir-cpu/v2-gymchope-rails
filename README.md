# Setting Up GymChope

You will need the following pre-installed locally on your computer:
- Ruby
- Rails
- node.js

 ## node.js installation
 Step 1: Download and setup node.js from https://nodejs.org/en/download/package-manager (node.js >= v20.10.0)

 Step 2: Check that you have node.js installed, in your terminal type
 `node -v`

 ## Ruby installation
 Step 1: Download Ruby from rubyinstaller.org [Ruby+Devkit 3.3.X (x64) version] (Ruby >= 3.3.4)

 Step 2: Check that you have ruby installed, in your terminal type
 `ruby -v`

 ## Rails installation

 Step 1: To install Rails, you can type the following in your terminal
 `gem install rails`

 Step 2: Check that you have ruby installed, in your terminal type
 `rails -v`

 ## Running the Website

 Step 1: Download all files from github

 Step 2: On your terminal, change your directory to gymchope-rails
 `cd v2-gymchope-rails`

 Step 3: Run `bundle install` `rails db:seed` and `rails db:migrate` to install dependencies, create and populate the database.

 Step 4: Run `rails s` to start backend server, and on your browser, navigate to 'http://localhost:3000' to check if it is set up properly. It should return a 'Beckend is online...' value.

 Step 5: On another tab of the terminal, change your directory to gymchope-rails/frontend via `cd frontend`

 Step 6: Install npm dependencies, `npm install axios`

 Step 7: Finally, run `npm run dev` to start the frontend server. Navigate to 'http://localhost:5174' on another tab in your browser to access the website.

 ## To edit

 Step 1: Change directory to v2-gymchope-rails

 Step 2: Type `code .` on your terminal.

