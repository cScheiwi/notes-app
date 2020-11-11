const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const indexRoutes = require('./routes/routes')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const hbs = expressHbs.create({

})

const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session.userSettings || {darkTheme: false, showFinished: true, sortAscending: true, sortedKey: 'completedUntil'};
    req.userSettings = req.session.userSettings = userSettings;

    next();
};

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({secret: 'nqwtgiwngioajdofnwqoientdlsnfoawnet'}));
app.use(sessionUserSettings);

app.use(indexRoutes);

app.listen(3000, "127.0.0.1", () => {
    console.log(`Server is running at http://localhost:3000}`);
});
