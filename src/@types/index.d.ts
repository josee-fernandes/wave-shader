import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  ShaderMaterial,
} from 'three'

export * from '@types/three'

export type MeshElementRef = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[] | ShaderMaterial,
  Object3DEventMap
>

export type UniformType = MutableRefObject<
  | {
      [uniform: string]: IUniform<unknown>
    }
  | undefined
>
