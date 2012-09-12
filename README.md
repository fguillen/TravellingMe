# Travelling Me

![Travelling Me image](http://farm7.static.flickr.com/6075/6067323142_651b69d2b9.jpg)

Because at the end there is not end.

## Versión

    v0.0.1

## Demo page

* [Demo page](http://fguillen.github.com/TravellingMe/)

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

MIT License

Copyright (c) 2012 Fernando Guillen Suarez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.