const   express     = require("express"),
        router      = express.Router(),
        passport    = require("passport"),
        User        = require("../models/user"),
        flash           = require("connect-flash"),
        Middleware      = require("../middleware/index");
       


// =====================================================================================
// ROOT ROUTE
// =====================================================================================
        
        router.get("/", function (req, res) {
            res.render("landing");
        });
// =====================================================================================
// AUTH ROUTES
// =====================================================================================


// REGISTER ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

// SIGNUP LOGIC ROUTE
router.post("/register", function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to JekkitCloud " + user.username);
                res.redirect("/campgrounds");
            })
        }
    } );
})

// LOGIN ROUTE
router.get("/login", function(req, res){
    
    res.render("login");
});

// LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) , function(req, res){
    
});


// LOGOUT ROUTE

router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;