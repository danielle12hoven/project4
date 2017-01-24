$(document).ready(function() {
console.log("script loaded")



// TESTING EVENTS APi//
var getEvents = function(events) {
$.ajax({
  type: 'GET',
  url: "https://api.cityofnewyork.us/calendar/v1/categories.htm?app_id=58a91670&app_key=7ecfe29e6005ba314b6488f35cc3550b",
  dataType: 'JSON',
  success: function(categories) {
    console.log("hello")
    postEvents()
  },

  error: function(categories) {
    console.log(categories)
  }
});
}

var postEvents = function(categories) {
  var $eventsUl = $("<ul>");

  for(var j=0; j < categories.length; j++){
    var $eventsLi = $("<li>");
    $eventsLi = $eventsLi.addClass("appendEvents")

  var eventsName = categories[j].athletic;

  $eventsLi.append($eventsName)
  $eventsUl.append($eventsLi)
  $(".postEvents").append($eventsUl)
    console.log("working")
}
  console.log("working")
}
  console.log("working")
// END OF TESTING EVENTS API//




$('[data-popup="popup-1"]').fadeIn(5000)

    //----- CLOSE
  console.log($('[data-popup-close]'));
    $('[data-popup-close]').on('click', function(e)  {
        var targetedPopup = $(this).attr('data-popup-close');
        $('[data-popup="' + targetedPopup + '"]').fadeOut(500);
    });
//end of dialog box//


});
