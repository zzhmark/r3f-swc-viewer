import create from 'zustand'
import { addEffect } from '@react-three/fiber'
import produce from 'immer'

// for storing swc and its animation state

const useStore = create((set, get) => ({
  tracks: [],
  setTracks: (fn) => set(produce(({ tracks }) => fn(tracks))),

  animation: { index: 0, phase: 0 },
  setAnimation: (fn) => set(produce(({ animation }) => fn(animation))),

  skeletons: [],
  setSkeletons: (fn) => set(produce(({ skeletons }) => fn(skeletons))),

  neurons: [],
  setNeurons: (fn) => set(produce(({ neurons }) => fn(neurons))),

  // brains: [
  //   // { filename: '6_1.gltf', color: [204 / 255, 204 / 255, 204 / 255], opacity: 0.1, roughness: 0, clearcoatRoughness: 0 },
  //   // { filename: '1022_1.gltf', color: [133 / 255, 153 / 255, 204 / 255], opacity: 0.1, roughness: 0, clearcoatRoughness: 0 },
  //   // { filename: '381_1.gltf', color: [1, 144 / 255, 1], opacity: 0.7, roughness: 0.5, clearcoatRoughness: 0 },
  //   // { filename: '672_1.gltf', color: [152 / 255, 214 / 255, 249 / 255], opacity: 0.1, roughness: 0, clearcoatRoughness: 0 },
  //   { filename: '997.gltf', color: [1, 1, 1], opacity: 0.05 },
  // ],
  // setBrains: (fn) => set(produce(({ brains }) => fn(brains))),
  // resetClock: () => {
  //   set(
  //     produce(({ mutation }) => {
  //       mutation.t = 0
  //       mutation.startTime = Date.now()
  //     })
  //   )
  // },

  // pushTrack: (coords) => {
  //   set(
  //     produce((state) => {
  //       let curve = new THREE.CatmullRomCurve3(coords.map((pos) => new THREE.Vector3(...pos)))
  //       let tubeGeometry = new THREE.TubeGeometry(curve, coords.length * 5, 0.2, 10, true)
  //       // state.tracks.push(tubeGeometry)
  //       state.mutation.track = tubeGeometry
  //     })
  //   )
  // },

  // turnOffBrain: (index) => {
  //   set((state) => {
  //     state.brains[index]['transparent'] = true
  //     state.brains[index]['roughness'] = 0
  //     state.brains[index]['clearcoatRoughness'] = 0
  //   })
  // },
  // turnOnBrain: (index) => {
  //   set((state) => {
  //     state.brains[index]['transparent'] = false
  //     state.brains[index]['roughness'] = 0.5
  //     state.brains[index]['clearcoatRoughness'] = 1
  //   })
  // },
  initAnimation: (mutation) => {
    addEffect(() => {
      const { tracks, animation } = get()
      const time = Date.now()
      let t = null
      if (animation.phase === 1) {
        t = mutation.t = 0
        mutation.startTime = time
      } else if (animation.phase === 3) {
        t = mutation.t = 1
      }
      if (tracks.length > 0) {
        if (t === null) {
          const tl = tracks[animation.index].parameters.path.getLength() * 2.5
          t = mutation.t = (time - mutation.startTime) / tl
          if (t > 1) {
            t = mutation.t = 1
          }
        }
        mutation.position = tracks[animation.index].parameters.path.getPointAt(t)
      }
    })
  },
}))

export default useStore
