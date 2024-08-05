import React from 'react'
// r3f
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// all canvas objects
import Scene from './Canvas/Scene'
// hooks
import useMutation from './Hooks/mutation'
import useStore from './Hooks/store'

export default function App() {
  const { mutation } = useMutation()
  const { initAnimation } = useStore()

  return (<div style={{display: 'flex'}}>
    <Canvas
	style={{width: '1280px', height: '720px', margin: 'auto'}}
      camera={{ far: 100000, near: 0.1, position: [100000, 100000, 100000] }}
      onCreated={() => {
        initAnimation(mutation)
      }}
    >
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      {/* <OrbitControls /> */}
      <Scene />
    </Canvas>
</div>
  )
}
