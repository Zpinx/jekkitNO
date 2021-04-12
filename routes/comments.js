const   express = require("express"),
        router  = express.Router({mergeParams: true}),
        Campground      = require("../models/campground"),
        Comment         = require("../models/comment"),
        Middleware      = require("../middleware/index");

// ========================================
//  COMMENTS ROUTES
// ========================================

// COMMETS NEW
router.get("/new",Middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
    
});
// =====================================================================================
// CREATE
// =====================================================================================
router.post("/",Middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Ops something whent wrong!");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    req.flash("success","Successfully added a review");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
   
});

// =====================================================================================
// EDIT - show edit form for one campground
// =====================================================================================
  
router.get("/:comment_id/edit",Middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment){
        if (err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// =====================================================================================
// UPDATE CAMPGROUND ROUTE
// =====================================================================================
router.put("/:comment_id",Middleware.checkCommentOwnership, function(req, res){
// find and uppdate the correct campground
Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,  function(err, updatedComment){
   if(err){
       res.redirect("back");
   } else{
       // redirect somewhere
       res.redirect("/campgrounds/"+ req.params.id);
   }
})

});

// =====================================================================================
// DESTROY COMMENT ROUTE
// =====================================================================================

router.delete("/:comment_id",Middleware.checkCommentOwnership, function(req, res){
// find and delete the correct Comment
Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
    if(err){
        res.redirect("back");
    } else {
        req.flash("success", "Comment deleted");
        res.redirect("/campgrounds/" + req.params.id);
    }
})

})






module.exports = router;