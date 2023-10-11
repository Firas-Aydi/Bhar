const express = require("express");
const path = require("path");
const RouterHome = require("./routers/home.route");
// const RouterBook = require("./routers/book.route");
const RouterAuth = require("./routers/auth.route");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const routeMycours = require('./routers/cours.route')
// const routeContact = require('./routers/contact.route')
const routeGererEducation = require('./routers/GererEducation.route')
const routeGererMarine = require('./routers/GererMarine.route')
const routeGererOtherAct = require('./routers/GererOtherAct.route')
const routeGererUrban = require('./routers/urban.route')
const routeGererAgricultural = require('./routers/agricultural.route')
const routeClasse = require('./routers/classe.route')
const routeCours = require('./routers/cours.route')

const app = express();

const bodyParser = require('body-parser'); // Require body-parser

// ... (other middleware and setup) ...

// Add body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware for parsing URL-encoded form data
app.use(bodyParser.json()); // Middleware for parsing JSON data

app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");

var store = new MongoDBStore({
  uri: "mongodb://0.0.0.0:27017/Bhar",
  collection: "sessions",
});
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
app.use(flash());
app.use(
  session({
    secret: "This is my secret key",
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    // },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
// app.get("/", (req, res) => {
//   // Ajouter un type à la session
//   req.session.type = "";
// });
app.use("/", RouterHome);
// app.use("/books", RouterBook);
app.use("/", RouterAuth);
app.use("/cour", routeMycours);
// app.use("/", routeContact);

app.use("/", routeGererEducation);
app.use("/", routeGererMarine);
app.use("/", routeGererOtherAct);
app.use("/", routeGererAgricultural);
app.use("/", routeGererUrban);
app.use("/", routeClasse);
app.use("/", routeCours);
// app.get("/dashboard", (req, res, next) => {
//   res.render("dashboard", { verifUser: req.session.userId });
// });
// app.get("/tables", (req, res, next) => {
//   res.render("tables", { verifUser: req.session.userId });
// });
app.get("/about", (req, res, next) => {
  res.render("about", { verifUser: req.session.userId,verifType: req.session.type });
});
// app.get("/mybooks", (req, res, next) => {
//   res.render("mybooks", { verifUser: req.session.userId });
// });
// app.get("/books", (req, res, next) => {
//   res.render("books");
// });
// app.get("/details", (req, res, next) => {
//   res.render("details");
// });
// app.get("/login", (req, res, next) => {
//   res.render("login");
// });


const i18n = require("i18n");


// Set up i18n configuration
// i18n.configure({
//   locales: ["en", "fr"], // Supported languages
//   directory: __dirname + "/locales",
//   defaultLocale: "en", // Default language
// });


// // Middleware to initialize i18n
// app.use(i18n.init);

// app.get("/change-language/:lang", (req, res) => {
//   const lang = req.params.lang;
//   req.session.locale = lang;
//   i18n.setLocale(req, lang);
//   res.redirect("back");
// });

// // Middleware to set the language based on the user's preference
// app.use((req, res, next) => {
//   const lang = req.cookies.lang || "en"; // Use the cookie value if set, or fallback to the default locale
//   i18n.setLocale(lang);
//   // res.locals.currentLocale = lang; // Make the current locale available in views
//   next();
// });



app.listen(3000, () => console.log("server run on port 3000"));