# Travelling Me 

![Travelling Me image](http://farm7.static.flickr.com/6075/6067323142_651b69d2b9.jpg)

Because at the end there is not end.

## Versión

    v0.0.1
    
## Demo page

* [Demo page](http://about.fernandoguillen.info/playing/travelling_me/)

## Requirement:

One _div_ as _container_ with _overflow: hidden_.

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
    
## Support

Only tested in Chrome 13.0.782.112.

## TODO

* Allow _sub-container_ to be less wide than the container.
* Center _sub-container_.
* suggestion: option to stop the motion when the mouse moves out of the travelling area

## License

This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.