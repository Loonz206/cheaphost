/**
 * @description JS file for SeaMonster Studios Theme
 * @author SeaMonster Studios
 * 
 */

windowState = 'large';

$(document).ready(function(){
    
/*
 * Screen Width Button (for development only. Located in the head)
 */
    $('#screenWidth').click(function(){
        var viewport = {
            width : $(window).width(),
            height : $(window).height()
        };
        
        var width = viewport.width;
        var height = viewport.height;
        
        alert("width: " + width);
    });

    $('.entry iframe').wrap('<div class="embed-container" />');

    /**
     * @description Call different functions based on screen width
     */
    //variable to hold the current window state - small, medium, or large
      
    //check initial width of the screen
      var sw = document.body.clientWidth;
      if (sw < 501){
        windowState = 'small';
        smPage();
      }else if (sw >= 501 && sw <= 940){
        windowState = 'medium';
        medPage();
      }else {
        windowState = 'large';
        lgPage();
      }
      if($('#map_canvas').length) {
        loadScript();
      }


}) //End document.ready


//take care of window resizing
  $(window).resize(function(){
    var sw = document.body.clientWidth;
    if(sw < 501 && windowState != 'small'){
      smPage();
    }
    if(sw >= 501 && sw <= 940 && windowState != 'medium'){
      medPage();    
    }
    if(sw >= 941 && windowState != 'large'){
      lgPage();
    }
  });

/**
 *@description Calls smPage() on screen width less than 31.3135em
 * 
 */
function smPage() {
    console.log('small page');
    mobileNav();
    catDropdown();
    windowState = 'small';
}

/**
 * @description Calls medPage() on screen width greater than 31.25em and less than 50em
 * 
 */
function medPage() {
    console.log('medium page');
    $('.mainNav ul').removeClass("js");
    $('#menu').remove();
    $('#catNavContainer').remove();
    windowState = 'medium';
}
 /**
  * @description Calls lgPage() on screen width greater than 50.0625em. 
  * 
  */
function lgPage() {
    console.log('large page');
    windowState = 'large';
}

/**
 * @description Mobile navigation. Navigation chages when the smPage() is called.
 * 
 */
function mobileNav() {
    if($('.js').length) {
      $('.js').removeClass('js');
    }
    
    $('#menu').remove();

    $('.mainNav > div > ul').addClass('js');
    $('.mainNav > div > ul').addClass('js').before('<div id="menu">☰</div>');
    $('#menu').click(function(){
          $('.mainNav > div > ul').toggle();
    });
}//end mobileNav()

/**
 * @description Turns navigation into a select menu.
 * 
 */
function catDropdown() {
  var url = 'localhost/( insert url of page )/';
  $('.catNav').each(function(){
    var $select = $('<select />');
    $select.addClass('mobileCatNav');

    var $start = $('<option>--Choose a Category--</option>');
    $start.attr({selected: 'selected'});
    $select.append($start);
    var $initial = $('<option>Blog Home</option>');
    $initial.attr({
      value: url,
      title: 'Blog',
    });
    $select.append($initial);
    $(this).find('a').each(function(){
      var $option = $('<option />');
      $option.attr('value', $(this).attr('href')).html($(this).html());
      $option.attr('title', $(this).attr('title'));
      $select.append($option);
    });

    $select.change(function(){
      window.location = $(this).find("option:selected").val();
      $(this).attr('selected', true);
    });
    $(this).replaceWith($select);

  }); 
}//end catDropdown()

/**
 * @description loading the google maps api
 *  - use with the div id '#map_canvas'
 */

function initialize() {
  var myLat = new google.maps.LatLng(47.773893, -122.148645);
  var mapOptions = {
    zoom: 16,
    center: myLat,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  var marker = new google.maps.Marker ({
    position: myLat,
    map: map,
    title: "Phoenix Comics & Games"
  });
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize";
  document.body.appendChild(script);
}









