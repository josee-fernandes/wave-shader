import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { MutableRefObject, useRef } from 'react'

import type {
  BufferGeometry,
  IUniform,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  ShaderMaterial,
} from '@/@types'

import { fragment, vertex } from './shader'

const Model: React.FC = () => {
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
    waveLength: { value: 5, min: 0, max: 20, step: 1 },
  })

  const plane =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null)

  const uniforms: MutableRefObject<
    | {
        [uniform: string]: IUniform<unknown>
      }
    | undefined
  > = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  })

  useFrame(() => {
    if (plane.current) {
      ;(plane.current.material as ShaderMaterial).uniforms.uTime.value += 0.04
      ;(plane.current.material as ShaderMaterial).uniforms.uWaveLength.value =
        waveLength
      ;(plane.current.material as ShaderMaterial).uniforms.uAmplitude.value =
        amplitude
    }
  })

  return (
    <mesh ref={plane}>
      <planeGeometry args={[3, 3, 45, 45]} />
      <meshBasicMaterial color={'red'} wireframe />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default Model
