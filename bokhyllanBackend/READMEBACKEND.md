## PROJECT OVERALL ARCHITECTURE

CLIENT -> SERVER -> ROUTES -> CONTROLLERS -> MODELS -> MONGOOSE -> MONGODB

## TECH STACK

# Backend

• Node.js (cross-platform JavaScript runtime environment)
• Express (Express app, express async handler)
• MongoDB (database)
• Mongoose (database mapper)
• ThunderClient (API tests)

# Security

• bcryptjs (password hashing)
• jsonwebtoken (JWT)

# Tools

• nodemon (auto restart of app & app server at changes under development)
• dotenv (environment variables)

# DEVELOPMENT PROCESS

0.  Install node.js (done previously)
1.  Set up - Initiate project from terminal
    mkdir projectname
    --> creates project folder (bokhyllanBackend)
    cd projectname
    --> defines the working directory
    npm init -y
    --> creates package.json with dependencies
2.  Install dependencies
    npm install express dotenv
    --> express framework for building backend server with react routes
    --> dotenv enables reading .env file
    npm install --save-dev nodemon
    --> nodemon starts app & server
    npm install --save-dev nodemon
    --> nodemon starts app & server
    npm install cors
    --> cors-stöd  
3.  Double-check installation success in package.json
4.  Create .env for definition of ports
5.  Create server.js
6.  Test
    npm run dev
7.  Create folders for routes, controllers, models & middleware
    mkdir routes controllers models middleware
    --> folders
8.  Create routes
    userRoutes.js
    userRoutes.js
9.  Create controllers
    userController.js
    userController.js
10. Create models
    userModel.js
    userModel.js
11. Create middleware
    validateTokenHandles.js
    userRoutes.js
12. Define configuration for database connections
    dbConnections.js

Connect to GitHub
git status
git add . (alt git add /projectfile/)
git commit -m "commit message"
git push origin main
