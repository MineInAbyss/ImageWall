var const_width = 3840; // constant ( width of the original image)
var const_height = 2160; // constant ( height of the original image)

var scale_width = 3840;
var scale_height = 2160;

var scale = 1;

window.onload = function() {}

var scrolled = 0;
var max_scroll = 30;
var min_scroll = -30;
var mouse_x = 0;
var mouse_y = 0;

var prev_mouse_x = 0;
var prev_mouse_y = 0;

function mouse_event(e) {
  prev_mouse_x = mouse_x;
  prev_mouse_y = mouse_y;
  mouse_x = e.clientX;
  mouse_y = e.clientY;
}

/* causes a zoom effect.
function scroll_event(e) {
  var out;
  var scaled;
  scroller = document.getElementById('scrollable_image');
  if(scroller.scrollTop > 414){
    if(scrolled < max_scroll){
      scrolled++;
      out = true;
      scaled = true;
    }
  }
  else if(scroller.scrollTop < 414){
    if(scrolled > min_scroll){
      scrolled--;
      out = false;
      scaled = true;
    }
  }

  if(scaled){
    if(scroller.scrollTop != 414){
      scale_factor = 0.02;

      var rect = scroller.getBoundingClientRect();
      var x = mouse_x - rect.left; //x position within the element.
      var y = mouse_y - rect.top;  //y position within the element.
      var prev_x = prev_mouse_x - rect.left;
      var prev_y = prev_mouse_y - rect.top;
      document.getElementById('translation_point').style=`left: ${x - 5}px; top: ${y - 5}px;`
      scale_img(scale - (scrolled * scale_factor), [x,y], [prev_x, prev_y], out);
      document.getElementById('mouse_point').style=`left: ${x - 5}px; top: ${y - 5}px;`;
      prev_mouse_x = mouse_x;
      prev_mouse_y = mouse_y;
    }
  }
  scroller.scrollTop = 414;
}

function scale_img(new_scale, mouse_pos, prev_mouse_pos, out){
  var scale = new_scale

  var img = document.getElementById('WallImage');

  var img_style = window.getComputedStyle(img);
  var width = parseInt(window.getComputedStyle(document.getElementById('ImageContainer')).getPropertyValue('width'), 10);
  var height = parseInt(window.getComputedStyle(document.getElementById('ImageContainer')).getPropertyValue('height'), 10);
  var left = parseInt(img_style.getPropertyValue('left'), 10);
  var top = parseInt(img_style.getPropertyValue('top'), 10);

  var y_diff = 0;
  var x_diff = 0;

  if(!out){
    y_diff = -(prev_mouse_pos[1] - mouse_pos[1]);
    x_diff = -(prev_mouse_pos[0] - mouse_pos[0]);
  }

  console.log("mousepos", mouse_pos);

  console.log("x diff = ", x_diff, "y diff = ", y_diff);

  trans_p = [parseInt(window.getComputedStyle(document.getElementById('translation_point')).getPropertyValue('left'), 10), parseInt(window.getComputedStyle(document.getElementById('translation_point')).getPropertyValue('top'), 10)]
  console.log("trans_p = ", trans_p)
  document.getElementById('translation_point').style = `left: ${trans_p[0] - x_diff}px; top: ${trans_p[1] - y_diff}px;`

  scale_width = const_width * scale;
  scale_height = const_height * scale;

  //new_top = top - y_diff;
  //new_left = left - x_diff;

  new_top = 0;
  new_left = 0;

  if(top > 0){
    top = 0;
  }
  if(left > 0){
    left = 0;
  }

  img.style = `
  top: ${new_top}px;
  left: ${new_left}px;
  width: ${scale_width}px;
  height: ${scale_height}px;
  `
}
*/

$(window).load(function(){
  $(function() {
    var containmentX1 = $(".drag").parent().offset().left;
    var containmentY1 = $(".drag").parent().offset().top;
    var containmentX2 =  ($(".drag").parent().outerWidth() +  $(".drag").parent().offset().left - $('.drag').outerWidth())
    var containmentY2 = ($(".drag").parent().outerHeight() +  $(".drag").parent().offset().top - $('.drag').outerHeight())

    $( ".drag" ).draggable({

    });
  });
});

function whilemousedown() {
  var const_width_start = -3840 * 2;
  x_pos = document.getElementById('ImageContaingerChild').style.left;
  y_pos = document.getElementById('ImageContaingerChild').style.top;

  if(parseInt(x_pos, 10) < -3840 * 3  || parseInt(x_pos, 10) > -3840 * 2){
    diff_x = parseInt(x_pos, 10)  % 3840;

    document.getElementById('ImageContaingerChild').style.left = const_width_start + diff_x + "px";
  }
  if(parseInt(y_pos, 10) > 0){
    document.getElementById('ImageContaingerChild').style.top = 0 + "px";
  }

  var height = parseInt(window.getComputedStyle(document.getElementById('ImageContainer')).getPropertyValue('height'), 10);
  if(parseInt(y_pos, 10) < ((2160 - height) * -1)){
    document.getElementById('ImageContaingerChild').style.top = -1400 + "px";
  }
}

var mousedownID = -1;
$( ".drag" ).live( "dragstart", function( event, ui ) {
  drag_start = true;
  if(mousedownID==-1)  //Prevent multiple loops!
    mousedownID = setInterval(whilemousedown, 1 /*execute every 100ms*/);
} );
$( ".drag" ).live( "dragstop", function( event, ui ) {
  if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
   }
});
