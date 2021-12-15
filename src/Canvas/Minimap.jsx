import { useRef, useEffect } from 'react'
// r3f
import { useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
// rendering & postprocessing
import Effects from './Effects'

export default function Minimap({ mapWidth, mapHeight, anchor }) {
  const { width, height } = useThree((state) => state.size)
  const camera = useRef()
  let vpBottom = anchor === 'ne' || anchor === 'nw' ? height - mapHeight : 0
  let vpLeft = anchor === 'ne' || anchor === 'se' ? width - mapWidth : 0
  useEffect(() => {
    camera.current.lookAt(0, -1, 0)
  }, [camera])
  return (
    <>
      <OrthographicCamera
        ref={camera}
        far={100000}
        left={-6000}
        right={6000}
        top={7000}
        bottom={-7000}
        up={[-1, 0, 0]}
        position={[0, 20000, 0]}
      />
      <Effects camera={camera.current} viewport={[vpLeft, vpBottom, mapWidth, mapHeight]} noClear priority={10} />
    </>
  )
}
