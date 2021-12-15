import { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
// r3f
import { useThree } from '@react-three/fiber'
// custom canvas components
import Rig from './Animation/Rig'
import Effects from './Effects'
import Minimap from './Minimap'
import Brain from './Mesh/Brain'
import Neuron from './Mesh/Neuron'
import Ensemble from './Animation/Ensemble'
// hooks
import useStore from '../Hooks/store'
// util func
import { computeSkeleton, loadSWC, longestTraversal } from '../utils.js'

export default function Scene() {
  const { skeletons, animation, setAnimation, setNeurons, setSkeletons, setTracks, tracks } = useStore()
  const { size } = useThree()
  const [swcFiles, setSwcFiles] = useState([
    '17109_2401_x8977_y24184.semi_r.swc',
    '236174_3729_x12692_y9419.semi_r.swc',
    '17302_00039.semi_r.swc',
  ])
  const startBrains = [
    [{ filename: '985_1.gltf', color: [31 / 255, 157 / 255, 90 / 255] }],
    [{ filename: '583_1.gltf', color: [138 / 255, 218 / 255, 135 / 255] }],
    [{ filename: '170_1.gltf', color: [255 / 255, 128 / 255, 132 / 255] }],
  ]
  const endBrains = [
    [
      { filename: '993_2.gltf', color: [31 / 255, 157 / 255, 90 / 255] },
      { filename: '985_2.gltf', color: [31 / 255, 157 / 255, 90 / 255] },
      { filename: '993_1.gltf', color: [31 / 255, 157 / 255, 90 / 255] },
    ],
    [
      { filename: '886_1.gltf', color: [26 / 255, 166 / 255, 152 / 255] },
      { filename: '879_1.gltf', color: [26 / 255, 166 / 255, 152 / 255] },
    ],
    [
      { filename: '385_1.gltf', color: [8 / 255, 13 / 255, 140 / 255] },
      { filename: '262_1.gltf', color: [155 / 255, 144 / 255, 159 / 255] },
    ],
  ]
  useEffect(() => {
    async function loadData(getSkeletons = false) {
      const neurons = await Promise.all(swcFiles.map((filename) => loadSWC(process.env.PUBLIC_URL + '/swc/' + filename)))
      setNeurons((store) => {
        store.splice(0)
        store.push(...neurons)
      })
      const tracks = neurons.map(longestTraversal).map((traversal) => {
        // console.log(traversal[1])
        // console.log(neurons[0][0])
        let curve = new THREE.CatmullRomCurve3(
          traversal.filter((e, i) => i % 100 === 0 || i === traversal.length - 1).map((pos) => new THREE.Vector3(...pos)),
          false,
          'catmullrom',
          1
        )
        return new THREE.TubeGeometry(curve, traversal.length * 10, 0.2, 10, true)
      })
      setTracks((store) => {
        store.splice(0)
        store.push(...tracks)
      })
      if (getSkeletons) {
        const skeleton = neurons.map(computeSkeleton)
        setSkeletons((store) => {
          store.splice(0)
          store.push(...skeleton)
        })
      }
    }
    loadData(true)
  }, [swcFiles])

  useEffect(() => {
    if (animation.phase === 4 && tracks.length > 0) {
      setAnimation((animation) => {
        // animation.index = Math.floor(Math.random() * tracks.length)
        animation.index = (animation.index + 1) % tracks.length
        animation.phase = 0
      })
    }
  }, [animation.phase])

  return (
    <>
      <color attach="background" args={['#050409']} />
      <fog attach="fog" args={['#070710', 0, 100000]} />
      {/* lighting */}
      <pointLight position={[0, 10000, 10000]} intensity={0.3} />
      <pointLight position={[0, 10000, -10000]} intensity={0.3} />
      <directionalLight position={[10000, -10000, 0]} intensity={0.5} />
      <directionalLight position={[-10000, -10000, 0]} intensity={0.5} />
      {/* async scene */}
      <Suspense fallback={null}>
        {/* {brains.map((props, index) => (
          <Brain key={index} {...props} />
        ))} */}
        <Rig></Rig>
        {/* animated parts */}
        {skeletons.length > animation.index ? (
          <Ensemble
            skeleton={skeletons[animation.index]}
            phase={animation.phase}
            setPhase={(n) =>
              setAnimation((animation) => {
                animation.phase = n
              })
            }
            startBrains={startBrains[animation.index]}
            endBrains={endBrains[animation.index]}
          />
        ) : null}
        {/* {skeletons.map((skeleton, index) => (
          <Action key={index} skeleton={skeleton} />
        ))} */}
        {skeletons.map((skeleton, index) => (
          <Neuron key={index} skeleton={skeleton} visible={animation.index === index} />
        ))}
        <Brain filename={'997.gltf'} color={[1, 1, 1]} opacity={0.1} clearcoatRoughness={0} clearcoat={1} metalness={1} roughness={0.6} />
      </Suspense>
      {Math.hypot(size.width, size.height) > 1080 ? (
        <Minimap mapWidth={((size.height / 2) * 6) / 7} mapHeight={size.height / 2} anchor={'sw'} />
      ) : null}
      {/* <Minimap mapWidth={(size.height * 6) / 7} mapHeight={size.height} anchor={'nw'} /> */}
      <Effects />
      {/* <Effects viewport={[(size.height * 6) / 7, 0, size.width - (size.height * 6) / 7, size.height]} /> */}
    </>
  )
}
