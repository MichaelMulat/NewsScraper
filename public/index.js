// Save an Article => set saved to true
function scrapeArticles(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function() {
    location.reload();
    
  });
}

function saveArticle(){
    var articleId = $(this).data("id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "/saved/" + articleId,
    }).then(function () {
        location.reload();
    });
}

// Save Note
function saveNote(){
    var articleId = $(this).attr("data-id-article");
    var newNote = $("#" + articleId).val().trim();

    console.log(articleId, newNote);

    $.ajax({
      method: "POST",
      url: "/saved/notes/" + articleId,
      data: {
        body: newNote
      }
    }).then(function() {
      // location.reload();
    });
}

function deleteNote(){
  var noteId = $(this).attr("data-id-note");
  console.log('clicked', noteId);

  $.ajax({
    method: "DELETE",
    url: "/notes/" + noteId
  }).then(function() {
    location.reload();
  });
}

function deleteArticle(){
  var articleId = $(this).attr("data-id-article");
  $.ajax({
    method: "DELETE",
    url: "/articles/" + articleId
  }).then(function() {
    location.reload();
  });
}

function clearAll(){
  
}

$("#scrape-btn").on("click", scrapeArticles);
$("#clear-btn").on("click", clearAll);
$(".save-btn").on("click", saveArticle);
$(".save-note-btn").on("click", saveNote);
$(".delete-note-btn").on("click", deleteNote);
$(".delete-article-btn").on("click", deleteArticle);

