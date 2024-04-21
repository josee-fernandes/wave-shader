'use client'

import { Canvas } from '@react-three/fiber'

import Model from './Model'

const Scene: React.FC = () => {
  return (
    <Canvas>
      <Model />
    </Canvas>
  )
}

export default Scene
