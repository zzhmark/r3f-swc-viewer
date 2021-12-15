import * as THREE from 'three'
import create from 'zustand'

// for camera rig animation

const useMutation = create((set, get) => ({
  mutation: {
    t: 0,
    position: new THREE.Vector3(),
    startTime: Date.now(),
  },
}))

export default useMutation
