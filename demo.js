var createCamera = require('game-shell-orbit-camera')
var createShell  = require('gl-now')
var createShader = require('gl-shader')
var createTexture= require('gl-texture2d')
var lena         = require('lena')
var glm          = require('gl-matrix')
var mat4         = glm.mat4

var shader
var mesh
var gl
var texture
var shell = createShell({
  clearColor: [0.75, 0.8, 0.9, 1.0]
})

var createBoxMesh = require('./')

var init = function() {
  gl = shell.gl

  camera = createCamera(shell)
  camera.distance = 10

  texture = createTexture(gl, lena)

  mesh = createBoxMesh(gl,
      {
        uv: [
        //x  y  w  h  r
          0, 0, 1, 1, 0, // back
          0, 0, 1, 1, 0, // front
          0, 0, 1, 1, 0, // top
          0, 0, 1, 1, 0, // bottom
          0, 0, 1, 1, 0, // left
          0, 0, 1, 1, 0  // right
        ],
      })

  shader = createShader(gl, [
'attribute vec3 position;',
'attribute vec2 uv;',
'uniform mat4 projection;',
'uniform mat4 view;',
'uniform mat4 model;',
'varying vec2 vUv;',
'void main() {',
'  vUv = uv;',
'  gl_Position = projection * view * model * vec4(position, 1.0);',
'}'].join('\n'),
[
'precision lowp float;',
'uniform sampler2D texture;',
'varying vec2 vUv;',
'void main() {',
'  gl_FragColor = texture2D(texture, vUv);',
'}'].join('\n'));
}

var view = new Float32Array(16)
var proj = new Float32Array(16)
var model = mat4.create()

var t = 0
var render = function(dt) {
  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  camera.view(view)
  mat4.perspective(proj
    , Math.PI / 4
    , shell.width / shell.height
    , 0.001
    , 1000
  )

  shader.bind()
  shader.attributes.position.location = 0
  shader.attributes.uv.location = 1
  shader.uniforms.projection = proj
  shader.uniforms.view = view
  shader.uniforms.model = model

  if (texture) shader.uniforms.texture = texture.bind()
  shader.attributes.position.pointer()
  shader.attributes.uv.pointer()

  mesh.bind()
  mesh.draw(gl.TRIANGLES, mesh.length)
  mesh.unbind()
}


shell.on('gl-init', init)
shell.on('gl-render', render)
