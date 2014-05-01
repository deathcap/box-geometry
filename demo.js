var createCamera = require('game-shell-orbit-camera')
var createShell  = require('gl-now')
var createShader = require('gl-shader')
var glm          = require('gl-matrix')
var mat4         = glm.mat4

var shader
var mesh
var gl
var shell = createShell({
  clearColor: [0.75, 0.8, 0.9, 1.0]
})

var createBoxMesh = require('./')

var init = function() {
  gl = shell.gl

  camera = createCamera(shell)
  camera.distance = 10

  mesh = createBoxMesh(gl, [
      {
        uv: [] // TODO: texture
      }])

  shader = createShader(gl, 
"attribute vec3 position;\
uniform mat4 projection;\
uniform mat4 view;\
uniform mat4 model;\
void main() {\
  gl_Position = projection * view * model * vec4(position, 1.0);\
}",

"precision lowp float;\
uniform vec4 color;\
void main() {\
  gl_FragColor = color;\
}");
}

var view = new Float32Array(16)
var proj = new Float32Array(16)
var model = mat4.create()

var t = 0
var render = function(dt) {
  camera.view(view)
  mat4.perspective(proj
    , Math.PI / 4
    , shell.width / shell.height
    , 0.001
    , 1000
  )

  shader.bind()
  //shader.attributes.position.location = 0
  shader.uniforms.projection = proj
  shader.uniforms.view = view
  shader.uniforms.model = model

  //if (skin) shader.uniforms.skin = skin.bind()
  shader.attributes.position.pointer()

  mesh.bind()
  mesh.draw(gl.TRIANGLES, mesh.length)
  mesh.unbind()
}


shell.on('gl-init', init)
shell.on('gl-render', render)
