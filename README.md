# Bokhyllan prototype app

Bokhyllan is a prototype SPA (single page application) to host a digital bookshop. The theme is chosen because of my love for books and physical bookshops. The vision is to create a cosy room for your next purchase of books. In addition, it should be easy for you to find books, create and manage your account, as well as to order books. Color schemes are selected from cooler.co with guidance from my personal taste in combination with coolers accessibility ratings. Font styles has been selected only by personal taste and would need to change for an app in production. So would the use of the color scheme to provide more contrast between the bacckground color and smaller items, such as text and icons.

## Project structure

The app build on separate frontend och backend parts. The project structure has the following main folders:

- bokhyllan (app main folder)
- bokhyllanFrontend (React + Vite-client)
- bokhyllanBackend (Node.js + Express API)

In addition, the app uses a modular, multilayered architecture to fulfil the separation of concerns and dependency inversion principles. These layers are implemented as Hooks, Components, Sections and Pages in the frontend, while as Models, Middleware, Controllers and Routes in the backend, and an API to connect both parts through the server.

The app flow can be illustrated, rather simplified, by following a request from the client to the database:
CLIENT (UI, ThunderClient) --> SERVER (Express app server.js) --> ROUTES --> CONTROLLER --> MODELS --> MONGOOSE --> MONGODB
Middleware such as contexts, contextproviders, hooks, tokenhandlers and auth-wrapper are used between the main flow items.

## Prerequisites

- Node.js framework
- Express package
- MongoDB Atlas account and cluster to access database of users and orders

## Set up

Start the app by installing the necessary dependencies in the respective frontend and backend projects

1. `cd bokhyllanFrontend && npm install`
2. `cd ../bokhyllanBackend && npm install`
3. `cd ../bokhyllanBackend && npm install`

## Run local

### Test user

A testuser has been registered with the credentials username: user, password: password

### Frontend

1. `cd bokhyllanFrontend`
2. `npm run dev`

### Backend

1. `cd bokhyllanBackend`
2. `npm run dev`

## Environmental variables

Create `.env` i `bokhyllanBackend` if needed
`PORT=3000`

## Tech stack

- Frontend: React (with JavaScript & React Complier) and Vite
  The React framework is a library and an architecture for web and native user interfaces. It was installed with JavaScript and React Compiler. React was supplemented with the Vite frontend build tool supporting server-side rendering (SSR) enabling instant hot module replacement (HMR).
  Command: npm create vite@latest

- Backend: Node.js (with Nodemon and dotenv) and Express
  Node.js is a cross-platform JavaScript runtime environment to build servers, web apps, command line tools and scripts.
  Nodemon is a utility for Node.js that monitors the project files and automatically restarts the application whenever changes are detected in the directory during app development.
  Dotenv is a zero-dependency Node.js module to load environment variables from a .env file into process.env. to keep API keys and database credentials out of the source code.
  Express is a framework for web and mobile apps facilitating API set up and communication that act as a middleware called to the app server.
  Commands: npm install --save-dev nodemon, npm install dotenv, npm install express

- Databases: MongoDB Atlas + Mongoose
  MongoDB Atlas is used to host a cluster of databases for user and order data.
  Mongoose is a Object Document Mapper (ODM) for MongoDB that translate the data from app models format to a format required by MongoDB.
  Commands: install mongoose, install mongodb

## Extensions/Tools

- React Router
  React Router is a standard library for routing in React web applications, enabling navigation between components without page reloads.
  Command: npm install react-router-dom
- Express Async Handler
  Express-async-handler is a middleware package to simplify error handling in asynchronous Express route handlers.
  Command: npm install express-async-handler
- Cross‑Origin Resource Sharing (CORS)
  CORS is a HTTP‑header–based browser security mechanism to specify external origin access to the resources in the app's API server (overrides the default same‑origin policy)
  Command: npm install cors
- BCrypt(js) + SALT
  BCrypt provides hashed passwords together with SALT that iterates the hashing to provide higher security
  Command: npm install bcryptjs
- JSON Web Token (JWT)
  JWT provides unique user signatures in json-format
  Command: npm install jsonwebtoken
