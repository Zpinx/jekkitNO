const   express         = require("express"),
        router          = express.Router(),
        Campground      = require("../models/campground"),
        Comment         = require("../models/comment"),
        Middleware      = require("../middleware/index");



// =====================================================================================
//  INDEX - Show all Campgrounds
// =====================================================================================
router.get("/", function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
              res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
    
   
});

// =====================================================================================
// CREATE - add new campground to DB
// =====================================================================================

router.post("/",Middleware.isLoggedIn, function (req, res) {
    
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
                    id: req.user._id,
                    username: req.user.username
                 }
    var newCampground = { name: name, price: price,image: image, description: description, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            } else {
            console.log(newlyCreated);    
            res.redirect("/campgrounds");
        }
    });
})

// =====================================================================================
// NEW - Show form to create new campground
// =====================================================================================

router.get("/new",Middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// =====================================================================================
// SHOW - show more info about one campground
// =====================================================================================

router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err)
       } else {
           console.log(foundCampground)
       // render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
})

// =====================================================================================
// EDIT - show edit form for one campground
// =====================================================================================
  
router.get("/:id/edit",Middleware.checkCampgroundOwnership, function (req, res) {
        Campground.findById(req.params.id,  function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

// =====================================================================================
// UPDATE CAMPGROUND ROUTE
// =====================================================================================
router.put("/:id",Middleware.checkCampgroundOwnership, function(req, res){
// find and uppdate the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else{
           // redirect somewhere
           res.redirect("/campgrounds/"+ req.params.id);
       }
    })

});

// =====================================================================================
// DESTROY CAMPGROUND ROUTE
// =====================================================================================

router.delete("/:id",Middleware.checkCampgroundOwnership, function(req, res){
    // find and delete the correct campground
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        Comment.deleteMany( {_id: { $in: deletedCampground.comments}}, (err) =>{
            if(err){
                console.log(err)
            } else {
                req.flash("success", "Campground deleted")
                res.redirect("/campgrounds");
            }
        })
    })
    // redirect somewhere
})




module.exports = router;