//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { request } = require("express");

const homeStartingContent = "Add '/compose' at the end of url to add a new post";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res) {

  Post.find({}, function(err, posts){
      res.render("home", {homePageContent: homeStartingContent, allPosts: posts});
  });

});

app.get("/about", function(req, res) {
  res.render("about", {aboutPageContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactPageContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  });

  post.save(function(err) {
    if(!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postID", function(req, res) {

  Post.findOne({_id: req.params.postID}, function(err, foundPost) {
    if(foundPost) {
      res.render("post", {
          title : foundPost.title,
          content : foundPost.content
        });
    } else {
      res.render("postnotfound");
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
