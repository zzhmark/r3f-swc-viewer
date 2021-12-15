// not used in this animation

import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import * as meshline from 'threejs-meshline'

extend(meshline)

const r = () => Math.max(0.2, Math.random())

function Fatline({ curve, width, color, speed }) {
  const material = useRef()
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed))
  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={0.95} />
    </mesh>
  )
}

export default function Sparks({ count, colors, radius = 10 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone()
        })
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.max(0.1, (0.2 * index) / 10),
          speed: Math.max(0.001, 0.004 * Math.random()),
          curve,
        }
      }),
    [count]
  )

  const ref = useRef()
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0.1, 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0.1, 0.1)
    }
  })

  return (
    <group ref={ref}>
      <group position={[0, 0, 0]} scale={[1, 1.3, 1]}>
        {lines.map((props, index) => (
          <Fatline key={index} {...props} />
        ))}
      </group>
    </group>
  )
}
