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
                req.flash("success", "Welcome to JekkitCloud " + user.firstname);
                res.redirect("/campgrounds");
            })
        }
    } );
})

// Login route
router.get("/login", passport.authenticate("azuread-openidconnect", { failureRedirect: "/login" }));

// Callback route after successful authentication
router.post(
  "/login/callback",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/login" }),
  function (req, res) {
    // Redirect or respond as needed after successful authentication
    res.redirect("/campgrounds");
  }
);


// LOGOUT ROUTE

router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;