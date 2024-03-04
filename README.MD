# Library Visitor Log - NodeJS, Express, MongoDB, Mongoose, EJS
  
**Description :**  
This is a library visitor log web application.
This app will track all people who come to the library and log their visits everytime they come to the library.

First, `Sign Up` to save your data such as Id, name, sex, birth date, phone number, and address  

Second, `Login`, then it will bring you to `account page`, here, you can see your information also your recent visits.  
In this account page you can :
1. `Delete` your account
2. `Edit` your information
3. `Enter` to log your visit time that will be shown as recent visit, later, on your account page.

___
**Run locally on your machine**  
You need to have installed Node and NPM.

Clone this repository  
`git clone https://github.com/nattooo/Library-Visitor-Log.git`

Installed dependencies  
`npm install`

Start NodeJS Server at https://localhost:3000  
`npm start`  
Alternatively, you can use Nodemon for automatic server restarts:
`nodemon devStart`

**Technologies**  
Node.js: JavaScript runtime environment.  
Express: Web application framework for Node.js.  
MongoDB: NoSQL database.  
Mongoose: MongoDB object modeling tool.  
EJS: Embedded JavaScript templates for rendering views.  
Express-EJS-Layouts: Layout support for EJS templates.  
Express-Session: Session middleware for Express.  
Connect-Flash: Flash message middleware for Express.  
Express-Validator: Middleware for input validation in Express.  
Method-Override: Middleware for HTTP method override in Express.  
Nodemon: Utility for auto-restarting the server during development.