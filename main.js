// fill in image width and height:
var width = 1900 * 3;
var height = 2850 * 3;

elements_on_map = [];

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
  var const_width_start = -width * 2;  // starting position of the screen as reference point
  x_pos = document.getElementById('ImageContainerChild').style.left; // get the x_pos ( amount left dragged )
  if(x_pos == ""){
    x_pos = const_width_start;
  }
    // check if the x_pos dragged is less than the starting position or further than 1 image from the starting position
    if(parseInt(x_pos, 10) < const_width_start * 3  || parseInt(x_pos, 10) > const_width_start * 2){
      diff_x = parseInt(x_pos, 10)  % width; // get the remainder, basicly the amount left or right dragged after removing the base image amount ( so you get the x_pos relative to the original image)
      document.getElementById('ImageContainerChild').style.left = const_width_start + diff_x + "px"; // set the x_pos of the background to the middle image and add the amount relative dragged
    }
    // do this again after 100 miliseconds to make sure it happens
    setTimeout(function() {
      if(parseInt(x_pos, 10) < -width * 3  || parseInt(x_pos, 10) > -width * 2){
        diff_x = parseInt(x_pos, 10)  % width;
        document.getElementById('ImageContainerChild').style.left = const_width_start + diff_x + "px";
      }
    }, 20)
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

//function to create clickable elements on the map
function add_Click_Elem(x, y, w = 10, h = 10, name, link="", debug=false){
  id = elements_on_map.length;  // element number
  refname = "";                 // debug only needed as reference to the name of the element
  click_Elem_debug = "";        // extra css line in the style to add background colour
  on_click = "window.open('"+link+"', '_blank');";  // onclick functionality

  if(debug){refname = name; click_Elem_debug = "Click_Elem_debug"; on_click = "remove_debug_elem("+id+")";} // changes to the variables in debug mode

  html_string = `<div id="Click_Elem_${id}">`;  // begin of clickable element
  for(var i = 0; i < 5; i++){ // program adds 5 clickable elements over the 5 image positions
    html_string += `<div onclick="${on_click}" Class="Click_Elem ${click_Elem_debug}" style="left: ${x + width * i}px; top: ${y}px; width: ${w}px; height: ${h}px;" id="Click_Elem_${id}_${i+1}"><br>${refname}</div>`;
  }
  html_string += `</div>`;

  // adds the clickable element div to the page
  document.getElementById('ImageContainerChild').innerHTML += html_string;
  elements_on_map.push(name + "_" + id); // adds the element to the array of existing elements
}

// function to remove the debug placed clickable element
function remove_debug_elem(id){
  elem = document.getElementById("Click_Elem_"+id);
  elem.parentNode.removeChild(elem);
  elements_on_map.pop("m_add" + elements_on_map.length + "_" + id);
}

// list of clickable elements to add when the page is loaded
window.onload = function(){
  add_Click_Elem(129,344, 170, 50, "big grondola", "https://www.youtube.com");
  add_Click_Elem(643,362, 150, 50, "Delver_HQ", "https://www.google.com")
}

// activates an event listener for when you click on the page ( after clicking on the debug button )
var clickCount=0;
function start_add_ui(e){
  setTimeout(function() {
    document.addEventListener('click', getmousepos);
  }, 50);
}

// function for adding clickable elements as debug element
function getmousepos(e){
  mouse_pos = [e.clientX, e.clientY]; // mouse position relative to the window
  pos = document.getElementById('ImageContainer').getBoundingClientRect();  // position of the container which holds the draggable image
  scroll_y = document.getElementById('ImageContainer').scrollTop; // scroll position relative to the image
  x_pos = document.getElementById('ImageContainerChild').style.left; // get the x_pos ( amount left dragged )
  if(x_pos == ""){  // if the x_pos is not set it means it's at -width
    x_pos = -width;
  }
  drag_x = Math.abs(parseInt(x_pos, 10)  % width); // get the relative to 1 image dragged amount
  console.log("add_Click_Elem("+ (mouse_pos[0] - pos.left + drag_x - 25) + "," + (mouse_pos[1] - pos.top + scroll_y - 25) + ", 50, 50, " + "m_add"+ elements_on_map.length + ")")
  // outputs the command that adds a clickable element to the screen
  add_Click_Elem(mouse_pos[0] - pos.left + drag_x - 25, mouse_pos[1] - pos.top + scroll_y - 25, 50, 50, "m_add" + elements_on_map.length, "", true); // adds a debug version of that element
  document.removeEventListener('click', getmousepos); // removes the event listener so you cant place infinite clickable elements
}
