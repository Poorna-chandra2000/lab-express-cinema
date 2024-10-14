require('dotenv/config');
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const app = express();

// Set up Handlebars as the view engine
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-cinema';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);
app.get('/movies', async (req, res) => {
    try {
      // Fetch movies from the database 
      const movies = await MovieModel.find(); 

      res.render('movies', { title: 'Movies', movies });
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = app;
