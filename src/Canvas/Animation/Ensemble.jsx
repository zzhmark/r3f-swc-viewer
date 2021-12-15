import React, { useEffect } from 'react'
import { SpringContext } from '@react-spring/three'
import Action from './Action'
import BrainBlink from './BrainBlink'

export default function Ensemble({ startBrains, skeleton, endBrains, phase, setPhase }) {
  useEffect(() => {
    if (phase === 0) {
      setTimeout(() => {
        setPhase(1)
      }, 3000)
    }
  }, [phase])
  return (
    <>
      <SpringContext pause={phase !== 1}>
        <BrainBlink brains={startBrains} nextPhase={() => setPhase(2)} />
      </SpringContext>
      <SpringContext pause={phase !== 3}>
        <BrainBlink brains={endBrains} nextPhase={() => setPhase(4)} />
      </SpringContext>
      {phase === 2 ? <Action skeleton={skeleton} nextPhase={() => setPhase(3)} /> : null}
    </>
  )
}
