import React, { useEffect } from 'react'
// r3f
import { useSprings, animated } from '@react-spring/three'
import { Sphere } from '@react-three/drei'
import { Set } from 'immutable'

function randomColor(s, l) {
  const colorAngle = Math.floor(Math.random() * 360)
  const color = 'hsl(' + colorAngle + ',' + s + ',' + l + ')'
  return color
}

export default function Action({ skeleton, nextPhase }) {
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
  const DENDRITE_SKELETON = Object.values(skeleton).filter(({ near, types }) => near !== null && !types.includes(2))
  const DENDRITE_SKELETON_SET = Set(DENDRITE_SKELETON.map(({ far }) => far))
  // get skeleton's array ref, filtering roots
  const AXON_SKELETON = Object.values(skeleton).filter(({ near, types }) => near !== null && types.includes(2))
  const AXON_SKELETON_SET = Set(AXON_SKELETON.map(({ far }) => far))

  // Set, dendrite tips
  const DENDRITE_TIP_FIBERS = Set(
    DENDRITE_SKELETON.map(({ children, types }, index) => (children.length === 0 && !types.includes(2) ? index : null)).filter(
      (index) => index !== null
    )
  )
  // starting fibers for axon phase
  const AXON_FIRST_FIBERS = Set(
    AXON_SKELETON.map(({ near, types }, index) => (skeleton[near].near === null && types.includes(2) ? index : null)).filter(
      (index) => index !== null
    )
  )
  // fired fibers set, judging whether to change phase, far nodes
  const [dendriteFired, setDendriteFired] = React.useState(Set())
  const [axonFired, setAxonFired] = React.useState(Set())

  // flag the phase
  const [activated, setActivated] = React.useState(false)

  // dendrite springs
  const [dendriteSprings, dendriteAPI] = useSprings(DENDRITE_SKELETON.length, (index) => {
    const { far, traversal } = DENDRITE_SKELETON[index]
    return {
      to: async (next, cancel) => {
        for (let p of traversal.concat().reverse())
          await next({
            position: p,
            visible: true,
          })

        await next({ visible: false })
      },
      from: { position: traversal[traversal.length - 1], visible: false },
      config: {
        duration: 1,
      },
      pause: true,
      onRest: () => {
        setDendriteFired((fired) => fired.add(far))
      },
    }
  })

  // axon springs
  const [axonSprings, axonAPI] = useSprings(AXON_SKELETON.length, (index) => {
    const { far, traversal } = AXON_SKELETON[index]
    return {
      to: async (next, cancel) => {
        for (let p of traversal)
          await next({
            position: p,
            visible: true,
          })

        await next({ visible: false })
      },

      from: { position: traversal[0], visible: false },
      config: {
        duration: 1,
      },
      pause: true,
      onRest: () => {
        setAxonFired((fired) => fired.add(far))
      },
    }
  })
  useEffect(() => {
    if (activated)
      axonAPI.start((index) => {
        if (AXON_FIRST_FIBERS.has(index)) return { pause: false }
      })
    else
      dendriteAPI.start((index) => {
        if (DENDRITE_TIP_FIBERS.has(index)) {
          return { pause: false }
        }
      })
  }, [activated])

  useEffect(() => {
    if (axonFired.isSuperset(AXON_SKELETON_SET)) nextPhase()
    if (activated)
      axonAPI.start((index) => {
        const { far, near } = AXON_SKELETON[index]
        if (axonFired.has(far)) return
        if (axonFired.has(near)) return { pause: false }
      })
  }, [axonFired])

  useEffect(() => {
    if (dendriteFired.isSuperset(DENDRITE_SKELETON_SET)) setActivated(true)
    dendriteAPI.start((index) => {
      const { far, children } = DENDRITE_SKELETON[index]
      if (dendriteFired.has(far)) return
      if (dendriteFired.isSuperset(Set(children))) return { pause: false }
    })
  }, [dendriteFired])

  return (
    <>
      {dendriteSprings.map(({ position, visible }, i) => {
        return (
          <animated.group key={i} position={position} visible={visible}>
            <Sphere args={[10, 4, 2]}>
              <meshPhysicalMaterial
                color={randomColor('100%', '80%')}
                transparent={false}
                clearcoat={1}
                roughness={0.5}
                metalness={0}
                clearcoatRoughness={1}
              />
            </Sphere>
          </animated.group>
        )
      })}
      {axonSprings.map(({ position, visible }, i) => {
        return (
          <animated.group key={i} position={position} visible={visible}>
            <Sphere args={[20, 4, 2]}>
              <meshPhysicalMaterial
                color={randomColor('100%', '80%')}
                transparent={false}
                clearcoat={1}
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
