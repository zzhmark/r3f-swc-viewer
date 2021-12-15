// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useGLTF } from '@react-three/drei'
// import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function Brain({ filename, ...rest }) {
  let geo
  // if (filename.endsWith('gltf')) {
  const { nodes } = useGLTF('/obj/' + filename)
  geo = Object.values(nodes)[0]['geometry'].clone(true).scale(-1, -1, -1).translate(6600, 4000, 5700)
  // } else {
  //   const obj = useLoader(OBJLoader, '/obj/' + filename)
  //   geo = obj.children[0]['geometry'].clone(true).scale(-1, -1, -1).translate(6600, 4000, 5700)
  // }
  return (
    <mesh>
      <primitive object={geo} attach="geometry" />
      <meshPhysicalMaterial wireframe={true} {...rest} />
    </mesh>
  )
}

Brain.defaultProps = {
  opacity: 0.1,
  transparent: true,
  metalness: 0.7,
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughtness: 0,
  side: THREE.DoubleSide,
  color: '#f0f0f0',
}
