RESTFULL ROUTES

name         url                                    verb        purpose
============================================================================================================================
INDEX       /campgrounds                             GET         Show all Campgrounds
NEW         /campgrounds/new                         GET         add new campground to DB
CREATE      /campgrounds                             POST        Show form to create new campground
SHOW        /campgrounds/:id                         GET         show more info
EDIT        /campgrounds/:id/edit                    GET         show edit form for one campground
UPDATE      /campgrounds/:id                         PUT         update a particular campground, then redirect somewhere
DESTROY     /campgrounds/:id                         DELETE      delete a particular campground, then redirect somewhere


NEW         /campgrounds/:id/comments/new            GET
CREATE      /campgrounds/:id/comments                PUT
EDIT        /campgrounds/:id/comments/edit           GET
UPDATE      /campgrounds/:id/comments                PUT
