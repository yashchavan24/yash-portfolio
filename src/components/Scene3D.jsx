import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShield() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.3
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={ref} position={[3, 0.5, -2]}>
        {/* Shield Body */}
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Inner Shield */}
        <mesh>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#8000ff"
            emissive="#8000ff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Core */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingCube({ position, color = '#00f0ff', size = 0.5, speed = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.5 * speed
    ref.current.rotation.z = clock.elapsedTime * 0.3 * speed
  })

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, color = '#ff00ff' }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.4
    ref.current.rotation.y = clock.elapsedTime * 0.6
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.6, 0.15, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function CodeRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * 0.2
  })

  return (
    <group ref={ref} position={[-3.5, -0.5, -3]}>
      <mesh>
        <torusGeometry args={[1.8, 0.02, 8, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.2, 0.015, 8, 64]} />
        <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={0.3} transparent opacity={0.2} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.6, 0.01, 8, 64]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.2} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 500
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5
    }
    return s
  }, [])

  useFrame(({ clock }) => {
    const posArray = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(clock.elapsedTime + i * 0.1) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CyberGrid() {
  return (
    <group position={[0, -3, -5]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <gridHelper args={[50, 50, '#00f0ff', '#1a1a3a']} />
    </group>
  )
}

function DataFlow() {
  const ref = useRef()
  const count = 30
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 8,
      z: -Math.random() * 8 - 2,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <Trail key={i} width={0.05} length={5} color="#00f0ff" attenuation={(t) => t * t}>
          <mesh position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#8000ff" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color="#ff00ff" />

      {/* Objects */}
      <FloatingShield />
      <FloatingCube position={[-4, 2, -3]} color="#00f0ff" size={0.6} speed={0.8} />
      <FloatingCube position={[5, -1.5, -4]} color="#ff00ff" size={0.4} speed={1.2} />
      <FloatingCube position={[-2, -2, -2]} color="#8000ff" size={0.3} speed={1} />
      <FloatingCube position={[1, 3, -5]} color="#00ff88" size={0.35} speed={0.6} />
      <FloatingTorus position={[4, 2, -3]} color="#ff00ff" />
      <FloatingTorus position={[-3, -1.5, -4]} color="#00f0ff" />
      <CodeRing />
      <DataFlow />

      {/* Effects */}
      <ParticleField />
      <Sparkles count={100} scale={20} size={2} speed={0.5} color="#00f0ff" opacity={0.3} />
      
      {/* Fog */}
      <fog attach="fog" args={['#0a0a0f', 5, 25]} />
    </>
  )
}
