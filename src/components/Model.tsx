import { useAspect, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { MotionValue, transform } from 'framer-motion'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import type { MeshElementRef, UniformType } from '@/@types'

import { fragment, vertex } from './shader'

interface ModelProps {
  scrollProgress: MotionValue<number>
}

const Model: React.FC<ModelProps> = ({ scrollProgress }) => {
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 5, min: 0, max: 20, step: 0.5 },
  })

  const plane = useRef<MeshElementRef>(null)
  const texture = useTexture('/images/photo.jpg')

  const { width, height } = texture.image
  const { viewport } = useThree()
  const scale = useAspect(width, height, 0.3)

  const uniforms: UniformType = useRef({
    vUvScale: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  })

  useFrame(() => {
    if (plane.current) {
      const scaleX = transform(
        scrollProgress.get(),
        [0, 1],
        [scale[0], viewport.width],
      )
      const scaleY = transform(
        scrollProgress.get(),
        [0, 1],
        [scale[1], viewport.height],
      )
      plane.current.scale.x = scaleX * 0.35
      plane.current.scale.y = scaleY * 0.35

      const scaleRatio = scaleX / scaleY
      const aspectRatio = width / height
      plane.current.material.uniforms.vUvScale.value.set(
        1,
        aspectRatio / scaleRatio,
      )

      const modifiedAmplitude = transform(
        scrollProgress.get(),
        [0, 1],
        [amplitude, 0],
      )

      plane.current.material.uniforms.uTime.value += 0.04
      plane.current.material.uniforms.uAmplitude.value = modifiedAmplitude
      plane.current.material.uniforms.uWaveLength.value = waveLength
    }
  })

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[3, 3, 45, 45]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default Model
