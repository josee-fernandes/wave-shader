'use client'

import { Canvas } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'

import Model from './Model'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

const Scene: React.FC<SceneProps> = ({ scrollProgress }) => {
  return (
    <Canvas>
      <Model scrollProgress={scrollProgress} />
    </Canvas>
  )
}

export default Scene
