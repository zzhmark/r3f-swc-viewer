import React from 'react'
import { useSpring, animated } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedBrain({ filename, style, ...rest }) {
  const { nodes } = useGLTF(process.env.PUBLIC_URL + '/obj/' + filename)
  const geo = Object.values(nodes)[0]['geometry'].clone(true).scale(-1, -1, -1).translate(6600, 4000, 5700)
  return (
    <animated.mesh position={style.opacity.to((o) => [0, o * 1000, 0])}>
      <primitive object={geo} attach="geometry" />
      <animated.meshPhysicalMaterial opacity={style.opacity.to((o) => o + 0.2)} roughness={style.roughness.to((r) => r)} {...rest} />
    </animated.mesh>
  )
}

AnimatedBrain.defaultProps = {
  transparent: true,
  metalness: 0.7,
  clearcoat: 1,
  clearcoatRoughness: 0,
  side: THREE.DoubleSide,
  color: '#f0f0f0',
}

export default function BrainBlink({ brains, nextPhase }) {
  const style = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 0.5, roughness: 0.5 })
      await next({ opacity: 0.1, roughness: 0 })
    },
    delay: 1000,
    from: { opacity: 0.1, roughness: 0 },
    onRest: (...args) => {
      if (args[0].finished) nextPhase()
    },
  })
  return brains.map(({ filename, color }) => <AnimatedBrain style={style} filename={filename} color={color} />)
}
