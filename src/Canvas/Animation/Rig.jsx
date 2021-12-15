import React, { useRef } from 'react'
import * as THREE from 'three'
// r3f
import { useThree, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
// hooks
import useStore from '../../Hooks/store'
import useMutation from '../../Hooks/mutation'

export default function Rig({ children }) {
  const group = useRef()
  const rig = useRef()
  const { tracks, animation } = useStore()
  const mutation = useMutation((state) => state.mutation)
  const { mouse } = useThree()
  const vec = new THREE.Vector3()
  const up = new THREE.Vector3(0, 1, 0)
  const quaternion = new THREE.Quaternion()
  let count = 0
  useFrame(({ camera }) => {
    const t = mutation.t
    if (tracks.length > 0) {
      let pos = mutation.position.clone()
      group.current.position.copy(mutation.position.clone())
      group.current.position.y = 19000
      pos.x += 800
      pos.y -= 800 - t * 5000
      // pos.z = pos.z * -1
      pos.z *= 1.3
      if (count > 100) {
        camera.position.lerp(pos, 0.003 * count)
      } else {
        camera.position.lerp(pos, 0.003 * count)
        count += 1
      }
      // camera.position.copy(pos)
      // can cause issue when refreshing components
      if (t > 0 && t < 1) camera.position.lerp(vec.set(mouse.x * 2000, mouse.y * 2000, 0), 0.05)
      const lookAt = tracks[animation.index].parameters.path.getPointAt(
        // Math.max(Math.min(t + 10 / tracks[animation.index].parameters.path.getLength(), 1), 0)
        Math.min(1, t + 0.1)
      )
      // lookAt.x += 500
      // lookAt.y -= 500
      lookAt.z *= 1.1
      camera.matrix.lookAt(camera.position, lookAt, up)
      quaternion.setFromRotationMatrix(camera.matrix)
      camera.quaternion.slerp(quaternion, 0.8)
      camera.zoom = 1
      camera.updateProjectionMatrix()
      // const lightPos = track.parameters.path.getPointAt((t + 1 / track.parameters.path.getLength()) % 1)
      // group.current.position.copy(cpos.multiplyScalar(0.68))
      // group.current.position.copy(pos)
      // group.current.quaternion.setFromRotationMatrix(camera.matrix)
    }
  })

  return (
    <>
      <group ref={group}>
        {/* <pointLight distance={1000} position={[0, 0, 0]} intensity={1.5} /> */}
        <Sphere args={[100]} visible={animation.phase === 2} />
        <group ref={rig} position={[0, 0, 0]}>
          {children}
        </group>
      </group>
    </>
  )
}
