import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Rotating brain made of particles
function BrainParticles() {
  const ref = useRef()
  const count = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.2 + (Math.random() - 0.5) * 0.3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.8
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.15
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8000ff" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// Neural network connections
function NeuralNetwork() {
  const ref = useRef()
  const nodes = useMemo(() => {
    const arr = []
    for (let i = 0; i < 15; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2],
        speed: 0.5 + Math.random() * 1
      })
    }
    return arr
  }, [])

  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].pos[0] - nodes[j].pos[0], 2) +
          Math.pow(nodes[i].pos[1] - nodes[j].pos[1], 2) +
          Math.pow(nodes[i].pos[2] - nodes[j].pos[2], 2)
        )
        if (dist < 2.5) {
          lines.push([nodes[i].pos, nodes[j].pos])
        }
      }
    }
    return lines
  }, [nodes])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={ref}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
        </mesh>
      ))}
      {connections.map(([start, end], i) => {
        const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#00f0ff" transparent opacity={0.1} />
          </line>
        )
      })}
    </group>
  )
}

// Rotating hexagon grid
function HexGrid() {
  const ref = useRef()
  const hexagons = useMemo(() => {
    const arr = []
    for (let q = -2; q <= 2; q++) {
      for (let r = -2; r <= 2; r++) {
        if (Math.abs(q + r) > 3) continue
        const x = 0.5 * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r)
        const z = 0.5 * (3 / 2 * r)
        arr.push({ pos: [x, 0, z], delay: Math.sqrt(q * q + r * r) * 0.3 })
      }
    }
    return arr
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={ref} rotation={[Math.PI / 6, 0, 0]}>
      {hexagons.map((hex, i) => (
        <Float key={i} speed={1} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
          <mesh position={hex.pos}>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 6]} />
            <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function AboutScene() {
  return (
    <>
      <BrainParticles />
      <NeuralNetwork />
      <HexGrid position={[5, -1, -3]} />
    </>
  )
}
