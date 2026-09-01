import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Holographic ring
function HoloRing({ radius, color, speed, yPos = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * speed
    ref.current.position.y = yPos + Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })
  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[radius, 0.01, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <torusGeometry args={[radius, 0.03, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

// Floating message bubbles
function MessageBubble({ position, color }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh scale={1.1}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

// Signal waves
function SignalWave({ position }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.children.forEach((child, i) => {
      const scale = 1 + (state.clock.elapsedTime * 0.5 + i * 0.5) % 3
      child.scale.setScalar(scale)
      child.material.opacity = Math.max(0, 0.3 - scale * 0.1)
    })
  })
  return (
    <group ref={ref} position={position}>
      {[0, 1, 2].map(i => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.005, 8, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// Particles
function ContactParticles() {
  const ref = useRef()
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8000ff" size={0.025} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export default function ContactScene() {
  return (
    <>
      <ContactParticles />
      <HoloRing radius={2} color="#00f0ff" speed={0.3} yPos={0} />
      <HoloRing radius={2.5} color="#8000ff" speed={-0.2} yPos={0.5} />
      <HoloRing radius={3} color="#00ff88" speed={0.15} yPos={-0.3} />
      <MessageBubble position={[3, 0, -2]} color="#00f0ff" />
      <MessageBubble position={[-3, 1, -3]} color="#8000ff" />
      <MessageBubble position={[4, -1, -4]} color="#00ff88" />
      <SignalWave position={[0, 2, -3]} />
    </>
  )
}
