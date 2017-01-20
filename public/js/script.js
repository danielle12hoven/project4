$(document).ready(function() {
console.log("script loaded")

// GOOGLE API//
var mykey = config.MY_KEY;
var apiKey = process.env.apiKey;


// AMENITIES API//
var getAmenities = function (amenities) {
  $.ajax({
    type:"GET",
    url: 'http://datamine.mta.info/mta_esi.php?key=MY_KEY',
    dataType: "JSON",
    success: function(data) {
      console.log(data.name);
      parseAmenities(data);
    },
    error: function(data){
      console.log(data)
    }
  })
}

var parseAmenities = function(data) {
  var $amenitiesUl = $("ul");
  var $amenitiesLi = $("li");
  var $amenitiesMap = data.name

  $amenitiesUl.append($amenitiesLi);
  $("postAmenitiesData").append($amenitiesUl)
}



$('[data-popup="popup-1"]').fadeIn(5000)

    //----- CLOSE
  console.log($('[data-popup-close]'));
    $('[data-popup-close]').on('click', function(e)  {
        var targetedPopup = $(this).attr('data-popup-close');
        $('[data-popup="' + targetedPopup + '"]').fadeOut(1000);
    });
//end of dialog box//


});
