/*
# Travelling Me 

* url: https://github.com/fguillen/TravellingMe
* author: http://fernandoguillen.info

## Versión

    v0.0.1

## Requirement:

One _<div>_ as _container_ with _overflow: hidden_.

One _element_ as _sub-container_ with a fixed _width_ and _height_ 
as container of the elements to scroll.

The _sub-container_ has to be at least as _wide_ as the _container_.

## Example
    <div id="scroll-me" style="with: 600px; height: 200px; overflow:hidden">
      <img src="my_scroll.jpg" with="1200px" height="400px" />
    </div>
      
    $('#scroll-me').travelling();

## Use: 

    $('#div-id').travelling();
    
### With configuration, defaults values

    $('#div-id').travelling({
      inactive_zone : 20,  // pixels arround div center where the velocity = 0
      max_velocity  : 10, // maximum pixels to move in one cycle
      fps           : 20  // frames per second
    });

*/ 

jQuery.fn.travelling = function( opts ) {
  return this.each( function() {
    new TravellingMe( $( this ), opts );
  });
};

function TravellingMe( div_to_scroll, opts ) {
  var opts_params   = opts;
  var div_to_scroll = div_to_scroll;
  var container_div = null;
  var step_x        = 0;
  var step_y        = 0;
  var x             = 0;
  var y             = 0;
  var width         = $( '#' + div_to_scroll.attr('id') + ' > *:first' ).width();
  var height        = $( '#' + div_to_scroll.attr('id') + ' > *:first' ).height();
  
  var opts = {
    inactive_zone : 20,
    max_velocity  : 10,
    fps           : 20,
  }
  
  var setup = function() {
    updateOpts();
    createDivs();
    mouseEventActivation();
    move();
  }
  
  var updateOpts = function() {
    opts = $.extend( opts, opts_params );
  }
  
  var createDivs = function() {
    container_div     = $( "<div id='travelling-me-container' style='position: absolute; top: 0px; left: 0px; width: " + (width * 2) + "px; height: " + height + "px;'></div>" );
    var left_portion  = $( "<div id='travelling-me-left-portion' class='travelling-me-portion' style='float: left; width: " + width + "px; height: " + height + "px;'></div>" );
    var right_portion = $( "<div id='travelling-me-right-portion' class='travelling-me-portion' style='float: left; width: " + width + "px; height: " + height + "px;'></div>" );
    
    left_portion.html( div_to_scroll.html() );
    right_portion.html( div_to_scroll.html() );
    
    div_to_scroll.empty();
    
    left_portion.appendTo( container_div );
    right_portion.appendTo( container_div );
        
    container_div.appendTo( div_to_scroll );
  }
  
  var mouseEventActivation = function() {
    $( div_to_scroll ).mousemove( function( e ){

      var active_zone_vertical    = ( div_to_scroll.height() / 2 ) - opts['inactive_zone'];
      
      // horizontal movement
      var active_zone = ( div_to_scroll.width() / 2 ) - opts['inactive_zone'];
      var tension     = divCenter()['x'] - e.pageX;
      if( Math.abs( tension ) > opts['inactive_zone'] ) {
        tension -= ( opts['inactive_zone'] * ( tension > 0 ? 1 : -1 ) );
      } else {
        tension = 0;
      }      
      step_x = tension * opts['max_velocity'] / active_zone;
      
      // horizontal movement
      var active_zone = ( div_to_scroll.height() / 2 ) - opts['inactive_zone'];
      var tension     = divCenter()['y'] - e.pageY;
      if( Math.abs( tension ) > opts['inactive_zone'] ) {
        tension -= ( opts['inactive_zone'] * ( tension > 0 ? 1 : -1 ) );
      } else {
        tension = 0;
      }
      step_y = tension * opts['max_velocity'] / active_zone;
    });
  }
  
  var divCenter = function() {
    result = {
      x: div_to_scroll.offset().left + (div_to_scroll.width() / 2),
      y: div_to_scroll.offset().top + (div_to_scroll.height() / 2)
    }
    
    return result;
  }
  
  var mousePointerDistantToDivCenter = function( e ){
    distant =
      Math.sqrt( 
        Math.pow( (divCenter()['x'] - e.pageX), 2 ) +
        Math.pow( (divCenter()['y'] - e.pageY), 2 )
      );
          
    return distant;
  }
  
  var move = function(){
    x += step_x;
    y += step_y;
    
    
    if( x > 0 ) {
      x -= width;
      container_div.css( 'left', (x - step_x) + 'px' );
    }
    
    if( x < -width ) {
      x += width;
      container_div.css( 'left', (x - step_x) + 'px' );
    }
    
    if( y > 0 ) {
      y = 0;
    }
    
    if( y < -(height - div_to_scroll.height()) ) {
      y = -(height - div_to_scroll.height());
    }
    
    container_div.animate( 
      { 
        left: x + "px",
        top: y + "px"
      }, 
      1000 / opts['fps'],
      'linear',
      function(){ move() } 
    );
  }
  
  var log = function() {
    console.log( "x:" + x );
    console.log( "y:" + y );
    console.log( "step_x:" + step_x );
    console.log( "step_y:" + step_y );
    console.log( "container_div.width:" + container_div.width() );
    console.log( "container_div.height:" + container_div.height() );
  }
  
  setup();
}
