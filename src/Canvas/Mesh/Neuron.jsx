// r3f
import { useThree } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'

export default function Neuron({ skeleton, uniColor, dendriteColor, apicalColor, axonColor, somaColor, visible }) {
  if (typeof uniColor !== 'undefined') {
    axonColor = uniColor
    dendriteColor = uniColor
    apicalColor = uniColor
  }
  const color = [somaColor, axonColor, dendriteColor, apicalColor]
  const root = Object.values(skeleton).filter(({ near }) => near === null)
  const { size } = useThree()
  return (
    <group visible={visible}>
      {root.map(({ traversal }, index) => (
        <Sphere key={index} args={[10, 100, 100]} position={traversal[0]}>
          <meshPhysicalMaterial
            color={color[0]}
            transparent={false}
            clearcoat={1}
            // opacity={0.5}
            roughness={0.5}
            metalness={0}
            clearcoatRoughness={1}
          />
        </Sphere>
      ))}
      {Object.values(skeleton)
        .filter(({ near }) => near !== null)
        .map(({ traversal, types }) => (
          <Line
            points={traversal}
            lineWidth={1080 / Math.hypot(size.width, size.height)}
            color={types.includes(4) ? apicalColor : types.includes(3) ? dendriteColor : axonColor}
          />
        ))}
      {/*<Line lineWidth={0.5}>*/}
      {/*  {neuron.map(({ type, parent_index, x, y, z, index }) => {*/}
      {/*    const p = neuron[parent_index]*/}
      {/*    return typeof p === 'undefined' ? null : <Segment key={index} start={[p.x, p.y, p.z]} end={[x, y, z]} color={color[type - 1]} />*/}
      {/*  })}*/}
      {/*</Segments>*/}
    </group>
  )
}

Neuron.defaultProps = {
  somaColor: 'snow',
  dendriteColor: 'seagreen',
  axonColor: 'orangered',
  apicalColor: 'royalblue',
}
