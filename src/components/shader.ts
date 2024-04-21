export const vertex = `
  uniform float uAmplitude;
  uniform float uWaveLength;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    float wave = uAmplitude * sin(position.x * uWaveLength + uTime);
    newPosition.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

export const fragment = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`
