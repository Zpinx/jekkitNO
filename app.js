const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
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

              

        
           
GetMongoUri(vaultName, secretName);        
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
      secret: "fkUvsqqrKavVxeqGNApjtd4*o*pkndjF!Cik@fgk3_dm7-ELCiqh76WABR2DWF42A!M8JR8BFTZD6PFM9JvFzWc!ibAxJoTLa_39", // Replace with your session secret
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(require("express-session")({
    secret: "fkUvsqqrKavVxeqGNApjtd4*o*pkndjF!Cik@fgk3_dm7-ELCiqh76WABR2DWF42A!M8JR8BFTZD6PFM9JvFzWc!ibAxJoTLa_39",
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




app.listen(process.env.PORT, process.env.IP, function() {
    console.log(process.env.PORT)
});




