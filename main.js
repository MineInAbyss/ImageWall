
// on window load add draggable effect to any elements with .drag, only draggable among x-axis
$(window).load(function(){
  $(function() {
    $( ".drag" ).draggable({
      axis: 'x'
    });
  });
});

// causes for infinite x-axis scrolling
function whilemousedown() {
  var const_width_start = -3840;  // starting position of the screen as reference point
  x_pos = document.getElementById('ImageContaingerChild').style.left; // get the x_pos ( amount left dragged )

  // check if the x_pos dragged is less than the starting position or further than 1 image from the starting position
  if(parseInt(x_pos, 10) < const_width_start * 2  || parseInt(x_pos, 10) > const_width_start){
    diff_x = parseInt(x_pos, 10)  % const_width_start*-1; // get the remainder, basicly the amount left or right dragged after removing the base image amount ( so you get the x_pos relative to the original image)
    document.getElementById('ImageContaingerChild').style.left = const_width_start + diff_x + "px"; // set the x_pos of the background to the middle image and add the amount relative dragged
  }
  // do this again after 100 miliseconds to make sure it happens
  setTimeout(function() {
    if(parseInt(x_pos, 10) < -3840 * 2  || parseInt(x_pos, 10) > -3840){
      diff_x = parseInt(x_pos, 10)  % 3840;

      document.getElementById('ImageContaingerChild').style.left = const_width_start + diff_x + "px";
    }
  }, 100)
}

var mousedownID = -1;
// when dragging starts execute the whilemousedown() code eve 1 ms
$( ".drag" ).live( "dragstart", function( event, ui ) {
  if(mousedownID==-1)  //Prevent multiple loops!
    mousedownID = setInterval(whilemousedown, 1);
});

// when dragging stops, stop executing whilemousedown()
$( ".drag" ).live( "dragstop", function( event, ui ) {
  if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
   }
});
