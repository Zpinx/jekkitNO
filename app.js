const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        methodOverride  = require("method-override"),
        LocalStrategy   = require("passport-local"),
        flash           = require('connect-flash'),
        User            = require("./models/user"),
        seedDB          = require("./seeds");
        secrets         = require('./secrets')
        port            = "3000";    // creates the server @ http://127.0.0.1:3000 

        // =================
        // ROUTES
        // =================
const   commentRoutes   = require("./routes/comments"),
        campgroundRoutes= require("./routes/campgrounds"),
        indexRoutes      = require("./routes/index");


secrets();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
seedDB(); //seed the database
 

// =====================================================================================
// PASSPORT CONFIGURATION
// =====================================================================================
app.use(require("express-session")({
    secret: "Nora og Emma er nydelig<3",
    resave: false,
    saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




app.listen(port, process.env.IP, function() {
    console.log("server has started")
});




