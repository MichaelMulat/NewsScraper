// Axios and cheerio to query and scrape
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function(app) {
  // Get all not saved
  app.get("/scrape", function(req, res) {
    axios.get("https://fivethirtyeight.com/politics/").then(function(response) {
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $(".fte_features").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element)
          .find(".article-title")
          .children("a")
          .text();
        result.link = $(element)
          .children("a")
          .attr("href");
        result.image = $(element)
          .children("a")
          .children("img")
          .attr("src");

        console.log(result);
        // Create a new Article using the `result` object built from scraping if the title and link exist
        if (result.title && result.link) {
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        }
      });
      // Send a message to the client
      res.redirect("/");
    });
  });

  // put route to updated the article to be saved:true
  app.post("/saved/:id", function(req, res) {
    // res.redirect("/")
    db.Article.updateOne(
      { _id: req.params.id },
      { $set: { saved: true } },
      function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/");
        }
      }
    );
  });

//   app.post("/saved/notes/:id", function(req, res)){
//       var newNote = req.body;
//     db.Note.save()
//   }

  app.get("/api/articles", function(req, res) {
    db.Article.find({})
      .populate("note")
      .then(function(data) {
        res.json(data);
      });
  });
};