$(document).ready(function() {
console.log("script loaded")

//API//
// var MY_KEY = config.MY_KEY;
// var MY_KEY = process.env.MY_KEY;


// MTA API//
// var getMTA = function (MTA) {
//   $.ajax({
//     type:"GET",
//     url: '/api/v1/trains/L',
//     dataType: "JSON",
//     success: function(data) {
//       console.log(data.train);
//       parseMTA(data);
//     },
//     error: function(data){
//       console.log(data)
//     }
//   })
// }

var parseMTA = function(data) {
  var $MTAUl = $("ul");
  var $MTALi = $("li");
  var $MTAMap = data.train

  $MTAUl.append($MTALi);
  $("postMTAData").append($MTAUl)
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
