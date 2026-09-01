import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Orbiting skill spheres
function SkillOrb({ position, color, size = 0.3, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={ref} position={position}>
        <mesh>
          <icosahedronGeometry args={[size, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
        <mesh scale={0.7}>
          <icosahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

// Orbital ring
function OrbitalRing({ radius, color, speed, tilt }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <group ref={ref} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.003, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      {/* Orbiting dot */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

// Skill constellation
function SkillConstellation() {
  const ref = useRef()
  const skills = useMemo(() => {
    const arr = []
    const names = ['React', 'Python', 'Node', 'TypeScript', 'Next.js', 'Three.js']
    for (let i = 0; i < names.length; i++) {
      const angle = (i / names.length) * Math.PI * 2
      const r = 2 + Math.random() * 0.5
      arr.push({
        pos: [Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r],
        color: ['#00f0ff', '#8000ff', '#00ff88', '#ff0080', '#00f0ff', '#8000ff'][i]
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={ref}>
      {skills.map((skill, i) => (
        <group key={i}>
          <mesh position={skill.pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
          {/* Connection to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, ...skill.pos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={skill.color} transparent opacity={0.1} />
          </line>
        </group>
      ))}
    </group>
  )
}

// Floating particles
function FloatingParticles() {
  const ref = useRef()
  const count = 300
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00ff88" size={0.02} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export default function SkillsScene() {
  return (
    <>
      <FloatingParticles />
      <SkillConstellation />
      <OrbitalRing radius={3} color="#00f0ff" speed={0.2} tilt={[Math.PI / 3, 0, 0]} />
      <OrbitalRing radius={3.5} color="#8000ff" speed={-0.15} tilt={[Math.PI / 2.5, Math.PI / 4, 0]} />
      <SkillOrb position={[4, 0, -2]} color="#00f0ff" size={0.4} speed={0.5} />
      <SkillOrb position={[-4, 1, -3]} color="#8000ff" size={0.5} speed={0.3} />
      <SkillOrb position={[3, -1.5, -4]} color="#00ff88" size={0.3} speed={0.7} />
    </>
  )
}
