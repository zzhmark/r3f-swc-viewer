import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
// r3f
import { extend, useThree, useFrame } from '@react-three/fiber'
// three.js examples
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass })

export default function Effects({ camera, viewport, priority }) {
  const composer = useRef()
  const three = useThree()
  const { scene, gl, size } = three
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
  if (typeof camera === 'undefined') camera = three.camera
  if (typeof viewport === 'undefined') viewport = [0, 0, size.width, size.height]
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    gl.setScissorTest(true)
    gl.setViewport(...viewport)
    gl.setScissor(...viewport)
    composer.current.render()
    // gl.render(scene, camera)
    gl.setScissorTest(false)
  }, priority)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1.5, 1, 0]} />
    </effectComposer>
  )
}

Effects.defaultProps = {
  priority: 1,
}
