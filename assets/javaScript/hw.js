
    var animals = ["dog","cat","rabbit","hamster","skunk","goldfish"]; // first animal list
    

    function renderButtons() {
      $("#buttons-appear-here").empty();
      for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("aButton");
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);
        a.css("text-align", "center");
        a.css("margin", "2px");
        a.css("background", "aqua");
        a.css("color", "#2d3e50");
        a.css("font-size", "22px");
        a.css("border-radius" , "100px");
        $("#buttons-appear-here").append(a);
      };
    }; // adding animals as button. (Works!)
    function getGifs(value){
      var animal = $(value).attr("data-animal"); // every button has data-animal
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=W2M3s4fJUGtL1Ik62gMHIxt7SCpcpYKt&limit=10"; // limit 10
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
            animalGifs.addClass("img-fluid");
            animalGifs.css("width", "100%");
            animalGifs.css("height", "200px");
            animalGifs.css("margin", "5px");
            animalGifs.css("border" , "2px solid aqua");
            

            var animalRating=$("<p>");
            animalRating.addClass("animal-rate");
            animalRating.text(results[i].rating);
            console.log(animalRating);
            animalRating.css("text-align", "center");
            animalRating.css("margin", "5px");
            animalRating.css("background", "#b9c9c9")
            animalRating.css("color", "#2d3e50")
            animalRating.css("font-size", "22px")
            animalRating.css("border" , "2px solid aqua");
            
        

            var perGif=$("<div>");
            perGif.append(animalRating).append(animalGifs);

            perGif.addClass("per-Gif");
            perGif.addClass("col-xl-3");
            perGif.addClass("col-lg-4");
            perGif.addClass("col-md-4");
            perGif.addClass("col-sm-6");
            perGif.css("margin", "5px");

          
           
  
            $("#gifs-appear-here").append(perGif);
              
          }
        });

    }; // getting gifs from giphy
    renderButtons();

    $("#gifs-appear-here").on("click", ".gifs", function() { // animate still-state!(gifs are gifs' class)
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


    $("#buttons-appear-here").on("click",".aButton", function() { // Button Click (aButton Button's class)
      console.log(this);
      
      getGifs(this); // if u call getGifs(cat), cat gifs will come.
    });

    $("#add-animal").on("click", function(event) { // submit botton for empty text box
        event.preventDefault();
        var c = $("#form-input").val().trim();
        animals.push(c);
        renderButtons();
    });
 