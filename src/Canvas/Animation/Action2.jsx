import React, { useEffect, useState } from 'react'
import { useSprings, animated, useSpringRef, useChain, useTransition } from '@react-spring/three'
import { Set } from 'immutable'
import { Sphere } from '@react-three/drei'

export default function Action({ skeleton }) {
  /* 
  item of neuron:
  {
    n: id by swc file
    parent: parent id by swc file, roots' parents are -1
    x: pos x
    y: pos y
    z: pos z
    r: radius
    index: id by line, starting from 0
    parent_index: parent id by line
    children: id by line of nodes connecting down from the root
  }
  
  item of skeleton (key is the far index):
  {
    traversal: [x, y, z] point sequence of this fiber
    near: index of the node on the fiber nearer to root, corresponding to line index in neuron
    far: index of the node on the fiber farther to root
    children: indices of the far nodes of fibers extending away from root
    types: terminal types of this fiber
  }
  */

  // get skeleton's array ref, filtering roots
  let DENDRITE_SKELETON = Object.values(skeleton).filter(({ near, types }) => near !== null && !types.includes(2))
  // get skeleton's array ref, filtering roots
  let AXON_SKELETON = Object.values(skeleton).filter(({ near, types }) => near !== null && types.includes(2))
  // fired fibers set, judging whether to change phase, far nodes
  const [dendrite, setDendrite] = useState(DENDRITE_SKELETON.map((v, i) => i))
  const [axon, setAxon] = useState(AXON_SKELETON.map((v, i) => i))

  const [dendriteFired, setDendriteFired] = useState(Set())
  const [axonFired, setAxonFired] = useState(Set())

  // flag the phase
  const dendriteRef = useSpringRef()
  const axonRef = useSpringRef()

  // dendrite springs
  const dendriteTransitions = useTransition(dendrite, {
    ref: dendriteRef,
    key: (item) => item,
    leave: (item) => async (next) => {
      const { traversal } = DENDRITE_SKELETON[item]
      for (let p of traversal.concat().reverse())
        await next({
          position: p,
          visible: true,
        })

      await next({ visible: false })
    },
    enter: (item) => {
      const { traversal } = DENDRITE_SKELETON[item]
      return { position: traversal[traversal.length - 1], visible: false }
    },
    config: {
      duration: 100,
    },
    onRest: (result, item) => {
      setDendriteFired((fired) => fired.add(item))
    },
  })

  // axon springs
  const axonTransitions = useTransition(axon, {
    ref: axonRef,
    key: (item) => item,
    to: (item) => async (next, cancel) => {
      const { traversal } = AXON_SKELETON[item]
      for (let p of traversal)
        await next({
          position: p,
          visible: true,
        })

      await next({ visible: false })
    },

    enter: (item) => {
      const { traversal } = AXON_SKELETON[item]
      return { position: traversal[0], visible: false }
    },
    config: {
      duration: 10,
    },
    pause: true,
    onRest: (result, item) => {
      setAxonFired((fired) => fired.add(item))
    },
  })

  // useEffect(() => {
  //   setAxon((axon) => axon.filter(({ near }) => !axonFired.has(near)))
  // }, [axonFired])

  useEffect(() => {
    setDendrite((dendrite) => dendrite.filter((item) => !DENDRITE_SKELETON[item].children.every((child) => dendriteFired.has(child))))
    console.log(dendriteFired)
  }, [dendriteFired])

  useChain([dendriteRef, axonRef])

  return (
    <>
      {dendriteTransitions(({ position, visible }) => {
        return (
          <animated.group position={position} visible={visible}>
            <Sphere args={[10, 1, 2]}>
              <meshPhysicalMaterial
                color={'wheat'}
                transparent={false}
                clearcoat={1}
                // opacity={0.5}
                roughness={0.5}
                metalness={0}
                clearcoatRoughness={1}
              />
            </Sphere>
          </animated.group>
        )
      })}
      {axonTransitions(({ position, visible }, i) => {
        return (
          <animated.group position={position} visible={visible}>
            <Sphere args={[20, 1, 2]}>
              <meshPhysicalMaterial
                color={'lightcyan'}
                transparent={false}
                clearcoat={1}
                // opacity={0.5}
                roughness={0.5}
                metalness={0}
                clearcoatRoughness={1}
              />
            </Sphere>
          </animated.group>
        )
      })}
    </>
  )
}
