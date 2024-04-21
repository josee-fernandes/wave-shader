export const vertex = `
  varying vec2 vUv;
  uniform float uAmplitude;
  uniform float uWaveLength;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    float wave = uAmplitude * sin(position.x * (uWaveLength * 0.35) + uTime);
    newPosition.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

export const fragment = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 vUvScale;

  void main() {
    vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`
