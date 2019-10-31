# Using the hot-reloading

Hello peasants,

if you want to use the hot-reloading (which is very handy), it will require you a bit of settuping but it'll be worth it:

1. Download and install [Node.js](https://nodejs.org/en/) on your computer
1. Open a command prompt and update npm with `npm install npm@latest -g`
1. Open a command prompt in your project's folder (where package.json is located)
1. Run `npm i` (you only need to execute this once, it will download locally the dev server into the `node_modules` folder)
1. Whenever you start working on the project, execute `npm run dev` ; this will start the dev server and reload the browser automatically whenever a change is made in the html, css or js files.