const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');

const app = express();

// set handlebars as view engine
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// init session mechanism
app.use(session({ secret: 'anything' }));
// init passport
app.use(passport.initialize());
app.use(passport.session());

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  req.logout(); //new
  res.render('index');
});

//new
app.get('/auth/logout', (req, res) => {
  res.render('logout');
});

// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

// app.get('/user/logged', (req, res) => {
//   res.render('logged');
// });

// app.get('/user/no-permission', (req, res) => {
//   res.render('noPermission');
// });

// app.get('/auth/google',
// passport.authenticate('google', { scope: ['email', 'profile'] }));

// app.get('/auth/google/callback', (req, res) => {
//   res.send(`I'm back from Google!`);
// });

// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
//   (req, res) => {
//     res.redirect('/user/logged');
//   }
// );

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
