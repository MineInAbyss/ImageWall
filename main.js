var const_width = 3840; // constant ( width of the original image)
var const_height = 2160; // constant ( height of the original image)

var scale_width = 3840;
var scale_height = 2160;

var scale = 1;

window.onload = function() {
  document.getElementById('drag_indicator').scrollTop = 414;
}

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

var mouseDown = 0;
function mousedown(){
  mouseDown++;
}
function mouseup(){
  mouseDown--;
}

var drag_start = false
var drag_start_pos = []

function whilemousedown() {
  if(drag_start){
    drag_start_pos = document.getElementById('ImageContainer').style.backgroundPosition.split(" ");
    drag_start = false;
  }
   drag_box = document.getElementById('drag_indicator');

   var left = parseInt(drag_start_pos[0], 10) + parseInt(drag_box.style.left, 10);
   var top = parseInt(drag_start_pos[1], 10) + parseInt(drag_box.style.left, 10);

   document.getElementById('ImageContainer').style.backgroundPosition = `${left}px ${top}px`
}

$(window).load(function(){
  $(function() {
    $( ".drag" ).draggable({});
  });
});

var mousedownID = -1;
$( ".drag" ).live( "dragstart", function( event, ui ) {
  drag_start = true;
  if(mousedownID==-1)  //Prevent multiple loops!
    mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);

} );
$( ".drag" ).live( "dragstop", function( event, ui ) {
  if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
   }
   console.log("stopped");
   document.getElementById('drag_indicator').style.left = "0px";
   document.getElementById('drag_indicator').style.top = "0px";
});
