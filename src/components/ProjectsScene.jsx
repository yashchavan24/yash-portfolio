import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Floating code blocks
function CodeBlock({ position, rotation, color }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.3, 0.8, 0.01]} />
          <meshBasicMaterial color="#0a0a1a" transparent opacity={0.9} />
        </mesh>
        {/* Code lines */}
        {[0.25, 0.1, -0.05, -0.2].map((y, i) => (
          <mesh key={i} position={[-0.3 + i * 0.1, y, 0.05]}>
            <boxGeometry args={[0.4 + Math.random() * 0.5, 0.04, 0.01]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#8000ff'} transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Rotating project cubes
function ProjectCube({ position, color, size = 0.5 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.z = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

// Data flow lines
function DataFlow() {
  const ref = useRef()
  const lines = useMemo(() => {
    const arr = []
    for (let i = 0; i < 10; i++) {
      const y = (Math.random() - 0.5) * 4
      const z = (Math.random() - 0.5) * 3 - 2
      arr.push({
        points: [
          new THREE.Vector3(-8, y, z),
          new THREE.Vector3(8, y + (Math.random() - 0.5) * 2, z)
        ],
        speed: 0.5 + Math.random() * 1,
        color: Math.random() > 0.5 ? '#00f0ff' : '#8000ff'
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    ref.current.children.forEach((child, i) => {
      if (child.material) {
        child.material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * lines[i].speed) * 0.05
      }
    })
  })

  return (
    <group ref={ref}>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(line.points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color={line.color} transparent opacity={0.1} />
          </line>
        )
      })}
    </group>
  )
}

export default function ProjectsScene() {
  return (
    <>
      <DataFlow />
      <CodeBlock position={[-4, 1, -3]} rotation={[0.2, 0.3, 0.1]} color="#00f0ff" />
      <CodeBlock position={[4, -0.5, -4]} rotation={[-0.1, -0.2, -0.1]} color="#8000ff" />
      <ProjectCube position={[3, 1.5, -2]} color="#00ff88" size={0.4} />
      <ProjectCube position={[-3, -1, -3]} color="#00f0ff" size={0.6} />
      <ProjectCube position={[5, -1.5, -4]} color="#8000ff" size={0.3} />
    </>
  )
}
