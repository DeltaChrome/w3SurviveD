
AFRAME.registerShader('ocean-shader', {
  schema: {
    color: {type: 'color', is: 'uniform', default: 'red'},
    opacity: {type: 'number', is: 'uniform', default: 1.0}
  },
  fragmentShader:
`
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  // This is the shader program.
  // A fragment shader can set the color via gl_FragColor,
  // or decline to draw anything via discard.
  void main () {
    // Note that this shader doesn't use texture coordinates.
    // Set the RGB portion to our color,
    // and the alpha portion to our opacity.
    gl_FragColor = vec4(color, opacity);
  }
`
});
