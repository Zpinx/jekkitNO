const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        session         = require('express-session')
        passport        = require("./middleware/passport-config");
        methodOverride  = require("method-override"),
        LocalStrategy   = require("passport-local"),
        flash           = require('connect-flash'),
        User            = require("./models/user"),
        seedDB          = require("./seeds");
        GetMongoUri     = require('./secrets');
        
        require('dotenv').config();

        //port            = "3000";    //!LOCAL ONLY! creates the server @ http://127.0.0.1:3000 
        vaultName = "jekkit-keyvault";
        secretName = "mongooseURI";

        // =================
        // ROUTES
        // =================
const   commentRoutes   = require("./routes/comments"),
        campgroundRoutes= require("./routes/campgrounds"),
        indexRoutes      = require("./routes/index");

              

        
           
GetMongoUri();        
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); //seed the database
 

// =====================================================================================
// PASSPORT CONFIGURATION
// =====================================================================================

app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key-here',

      resave: false,
      saveUninitialized: false,
    })
  );
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




app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});




