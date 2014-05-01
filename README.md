# box-geometry

Simple cube geometry mesh generator for [gl-vao](https://github.com/gl-modules/gl-vao)

![screenshot](http://i.imgur.com/VRRyq9B.png "Screenshot")

Creates a Vertex Array Object for a 1x1x1 cube from (-0.5,-0.5,-0.5) to (+0.5.+0.5,+0.5).
Also optionally sets UV coordinates for texturing and applies matrix transformations.

For an example, run `npm start` or try the **[live demo](http://deathcap.github.io/box-geometry)**.
Click and drag to rotate the cube (uses [game-shell-orbit-camera](https://github.com/mikolalysenko/game-shell-orbit-camera)).
See the [avatar](https://github.com/deathcap/avatar) module for more advanced usage.

Usage:

    var createBoxMesh = require('box-geometry');

    var mesh = createBoxMesh(gl,
        {
            // mesh options
        }[, globalOpts]);

will create one cube. Alternatively you can pass an array of objects to create
multiple cubes in one mesh. Supported mesh options:

`uv`: Array to set UV texture coordinates, for each of the six faces.
For each face: the starting U and V coordinates, the width and height (actually
offsets, may be negative to reverse),
and a rotation value (0 to 3, determines where the starting coordinate
corresponds to one of the four face corner vertices). Example using the same
whole texture everywhere:

    //x  y  w  h  r
      0, 0, 1, 1, 0, // back
      0, 0, 1, 1, 0, // front
      0, 0, 1, 1, 0, // top
      0, 0, 1, 1, 0, // bottom
      0, 0, 1, 1, 0, // left
      0, 0, 1, 1, 0  // right

`matrix`: 4x4 transformation matrix, applied to all vertices before adding to mesh
(create using [gl-matrix](https://github.com/toji/gl-matrix)).

Global options:

`uDiv`, `vDiv`: Divisors used to scale the UV coordinates in the `uv` array above.
By default these are 1, but you can set them to a higher value to more conveniently
represent UV coordinates in your application (for example, set to 64 then pass
32 instead of 32/64=0.5, or 1 instead of 1/64=0.015625, etc.).

`setWindex`: If true, the `w` coordinate of each vertex will be set to the cube's
index. Useful if there are multiple cubes and you want to handle them differently
in the shader using this coordinate. Otherwise it set to 1.0.

## References / see also

* [Mozilla Developer Network: Creating 3D objects using WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL/Creating_3D_objects_using_WebGL) - cube example
* [three.js](http://threejs.org/) - includes a `BoxGeometry` class (formerly `CubeGeometry`)

## License

MIT

