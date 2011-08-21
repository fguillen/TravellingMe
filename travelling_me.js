

function TravellingMe( div_selector, width, height, opts ) {
  this.opts_params = opts;
  this.div_to_scroll = $( div_selector );
  var container_div = null;
  var step_x = 0;
  var step_y = 0;
  var x = 0;
  var y = 0;
  var width = width;
  var height = height;
  
  var opts = {
    not_sensible_mouse_zone: 20,
    max_step: 4,
    velocity_relax: 100,
    milliseconds_step: 20,
  }
  
  var setup = function() {
    updateOpts();
    createDivs();
    mouseEventActivation();
    move();
  }
  
  
  var updateOpts = function() {
    console.log( "opts_params:" + this.opts_params );
    console.log( "this:" + this );
    opts = $.extend( opts, this.opts_params );
  }
  
  
  var createDivs = function() {
    container_div = $( "<div id='travelling-me-container' style='position: absolute; top: 0px; left: 0px; width: " + (width * 2) + "px; height: " + height + "px;'></div>" );
    var left_portion = $( "<div id='travelling-me-left-portion' class='travelling-me-portion' style='float: left; width: " + width + "px; height: " + height + "px;'></div>" );
    var right_portion = $( "<div id='travelling-me-right-portion' class='travelling-me-portion' style='float: left; width: " + width + "px; height: " + height + "px;'></div>" );
    
    left_portion.html( this.div_to_scroll.html() );
    right_portion.html( this.div_to_scroll.html() );
    
    this.div_to_scroll.empty();
    
    left_portion.appendTo( container_div );
    right_portion.appendTo( container_div );
        
    container_div.appendTo( this.div_to_scroll );
  }
  
  var mouseEventActivation = function() {
    $( document ).mousemove( function( e ){
    
      if( mousePointerDistantToDivCenter( e ) > opts['not_sensible_mouse_zone'] ) { 
        step_x = (divCenter()['x'] - e.pageX) / opts['velocity_relax'];
        step_y = (divCenter()['y'] - e.pageY) / opts['velocity_relax'];
      } else {
        step_x = 0;
        step_y = 0;
      }
      
      if( Math.abs( step_x ) > opts['max_step'] ){
        step_x = opts['max_step'] * ( step_x > 0 ? 1 : -1 )
      }
      
      if( Math.abs( step_y ) > opts['max_step'] ){
        step_y = opts['max_step'] * ( step_y > 0 ? 1 : -1 )
      }
    });
  }
  
  var divCenter = function() {
    result = {
      x: this.div_to_scroll.offset().left + (this.div_to_scroll.width() / 2),
      y: this.div_to_scroll.offset().top + (this.div_to_scroll.height() / 2)
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
    
    if( isNaN( x ) ){
      console.log( 'step_x:' + step_x );
    }
    
    if( x > 0 ) {
      console.log( "x:" + x );
      console.log( "width:" + width );
      x -= width;
      console.log( "x:" + x );
      
      container_div.css( 'left', (x - step_x) + 'px' );
    }
    
    if( x < -width ) {
      console.log( "x:" + x );
      console.log( "width:" + width );
      x += width;
      console.log( "x:" + x );
      container_div.css( 'left', (x - step_x) + 'px' );
    }
    
    if( y > 0 ) {
      y = 0;
    }
    
    if( y < -(height - this.div_to_scroll.height()) ) {
      y = -(height - this.div_to_scroll.height());
    }
    
    container_div.animate( 
      { 
        left: x + "px",
        top: y + "px"
      }, 
      opts['milliseconds_step'],
      'linear',
      function(){ move() } 
    );
    
    // log();
  }
  
  var log = function() {
    console.log( "x:" + x );
    console.log( "y:" + y );
    console.log( "step_x:" + step_x );
    console.log( "step_y:" + step_y );
    console.log( "container_div.width:" + container_div.width() );
    console.log( "container_div.height:" + container_div.height() );
  }
  
  return {
    setup: setup,
    log: log,
    divCenter: divCenter
  };
}
