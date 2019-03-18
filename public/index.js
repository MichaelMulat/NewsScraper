// Save an Article => set saved to true

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

function saveNote(){
    var articleId = $(this).data("id");
    var newNote = $(".new")

    $.ajax({
      method: "POST",
      url: "/saved/notes/" + articleId

    }).then(function() {
      location.reload();
    });
}

$(".save-btn").on("click", saveArticle);
$(".save-note-btn").on("click", saveNote);

// Clear articles where saved = false