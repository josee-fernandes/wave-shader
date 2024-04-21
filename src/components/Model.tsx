import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

import type { MeshElementRef, UniformType } from '@/@types'

import { fragment, vertex } from './shader'

const Model: React.FC = () => {
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
    waveLength: { value: 5, min: 0, max: 20, step: 1 },
  })

  const plane = useRef<MeshElementRef>(null)
  const texture = useTexture('/images/photo.jpg')
  const uniforms: UniformType = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  })

  useFrame(() => {
    if (plane.current) {
      plane.current.material.uniforms.uTime.value += 0.04
      plane.current.material.uniforms.uWaveLength.value = waveLength
      plane.current.material.uniforms.uAmplitude.value = amplitude
    }
  })

  return (
    <mesh ref={plane}>
      <planeGeometry args={[3, 3, 45, 45]} />
      <meshBasicMaterial color={'red'} wireframe />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        // wireframe
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default Model
