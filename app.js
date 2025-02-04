const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const dotenv = require('dotenv');

// Set path to .env file
dotenv.config({ path: './.env' });

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection

const dbURI = process.env.MONGODB_CONNECTION_URL;
console.log('MONGODB_CONNECTION_URL: ', dbURI)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000, (err) => {
    if(err) {
      console.log('error starting server: ', err)
    } else {
      console.log('server running at port: 3000')
    }
    
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);