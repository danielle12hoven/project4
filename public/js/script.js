$(document).ready(function() {
console.log("script loaded")

$('[data-popup="popup-1"]').fadeIn(5000)

    //----- CLOSE
  console.log($('[data-popup-close]'));
    $('[data-popup-close]').on('click', function(e)  {
        var targetedPopup = $(this).attr('data-popup-close');
        $('[data-popup="' + targetedPopup + '"]').fadeOut(1000);
    });
//end of dialog box//






});
