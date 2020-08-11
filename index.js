const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const members = require('./Members');
// const logger = require('./middleware/logger');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Members App',
    members,
  })
);

// About route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
  });
});

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
