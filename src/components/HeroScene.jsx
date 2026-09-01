import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Floating shield wireframe
function CyberShield({ position, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.5
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
        </mesh>
        <mesh scale={0.8}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.1} />
        </mesh>
        <mesh scale={0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#8000ff" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

// DNA-like helix
function DataHelix({ position }) {
  const ref = useRef()
  const points1 = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      const t = i / 50 * Math.PI * 4
      pts.push(new THREE.Vector3(Math.cos(t) * 0.5, (i / 50) * 4 - 2, Math.sin(t) * 0.5))
    }
    return pts
  }, [])

  const points2 = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      const t = i / 50 * Math.PI * 4 + Math.PI
      pts.push(new THREE.Vector3(Math.cos(t) * 0.5, (i / 50) * 4 - 2, Math.sin(t) * 0.5))
    }
    return pts
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  return (
    <group ref={ref} position={position}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={points1.length} array={new Float32Array(points1.flatMap(p => [p.x, p.y, p.z]))} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={points2.length} array={new Float32Array(points2.flatMap(p => [p.x, p.y, p.z]))} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#8000ff" transparent opacity={0.3} />
      </line>
    </group>
  )
}

// Floating cube grid
function CubeGrid({ position }) {
  const ref = useRef()
  const cubes = useMemo(() => {
    const arr = []
    for (let x = -2; x <= 2; x++) {
      for (let z = -1; z <= 1; z++) {
        arr.push({
          pos: [x * 0.6, 0, z * 0.6],
          delay: Math.random() * 2,
          speed: 0.5 + Math.random() * 1
        })
      }
    }
    return arr
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <group ref={ref} position={position}>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} />
      ))}
    </group>
  )
}

function FloatingCube({ pos, delay, speed }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speed + delay) * 0.3
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.3
  })
  return (
    <mesh ref={ref} position={pos}>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.25} />
    </mesh>
  )
}

// Torus knot
function CyberKnot({ position, color = '#8000ff' }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={[0.8, 0.02, 100, 8, 2, 3]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

// Particle field
function ParticleField() {
  const ref = useRef()
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <>
      <ParticleField />
      <CyberShield position={[4, 0.5, -2]} scale={1.2} />
      <CyberShield position={[-3, -1, -3]} scale={0.8} />
      <DataHelix position={[5, 0, -4]} />
      <CubeGrid position={[-4, 1, -3]} />
      <CyberKnot position={[3, -1.5, -3]} color="#00f0ff" />
      <CyberKnot position={[-5, 0.5, -5]} color="#8000ff" />
    </>
  )
}
