$( document ).ready(function() {
    var animals = ["dog","cat","rabbit","hamster","skunk","goldfish"]; // first animal list
    

    function renderButtons() {
        $("#buttons-appear-here").empty();
        for (var i = 0; i < animals.length; i++) {
          var a = $("<button>");
          a.addClass("aButton");
          a.attr("data-animal", animals[i]);
          a.text(animals[i]);
          $("#buttons-appear-here").append(a);
        };
    }; // adding animals as button. (Works!)
    function getGifs(value){
        var animal = $(value).attr("data-animal"); // every button has data-animal
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=dc6zaTOxFJmzC&limit=10"; // limit 10
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            var results=response.data;
            for (var i = 0; i < results.length; i++) {
              var animalGifs=$("<img>");
              animalGifs.addClass("gifs");
              animalGifs.attr("src", results[i].images.fixed_height_still.url);
              animalGifs.attr("data-state", "still");
              animalGifs.attr("data-animate", results[i].images.fixed_height.url);
              animalGifs.attr("data-still", results[i].images.fixed_height_still.url);
      
              var animalRating=$("<p>");
              animalRating.addClass("animal-rate");
              animalRating=results[i].rating;
              console.log(animalRating);
              
              var perGifs=$("<div>");
              perGifs.addClass("per-gifs");
              perGifs.append(animalRating);
              perGifs.append(animalGifs);
  
              $("#gifs-appear-here").append(perGifs);
              
            }
          });

    }; // getting gifs from giphy
    renderButtons();

    $(".gifs").on("click", function() { // animate still-state!(gifs are gifs' class)
    console.log("clicked");
  
        var state=$(this).attr("data-state"); // every gifs has data-state,data-animate,data-value,
        console.log(state);
        if(state==="still"){
            var c=$(this).attr("data-animate");
            $(this).attr("src",c);
            $(this).attr("data-state","animate");
        };
        if(state==="animate"){
            var c=$(this).attr("data-still");
            $(this).attr("src",c);
            $(this).attr("data-state","still");
        };
    });
   
    $(".aButton").on("click", function() { // Button Click (aButton Button's class)
      console.log(this);
      
        getGifs(this); // if u call getGifs(cat), cat gifs will come.
    });

    $("#add-animal").on("click", function(event) { // submit botton for empty text box
        event.preventDefault();
        var c = $("#form-input").val().trim();
        animals.push(c);
        renderButtons();
    });

 
});