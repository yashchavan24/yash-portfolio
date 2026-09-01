import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

function Globe({ onZoomComplete, shouldZoom }) {
  const globeRef = useRef()
  const ringsRef = useRef([])
  const particlesRef = useRef()
  const [phase, setPhase] = useState('rotate') // rotate -> zoom -> done
  const zoomProgress = useRef(0)

  useEffect(() => {
    if (shouldZoom && phase === 'rotate') {
      setPhase('zoom')
    }
  }, [shouldZoom, phase])

  // Create globe geometry with wireframe
  const globeGeometry = useMemo(() => new THREE.IcosahedronGeometry(2, 3), [])
  const innerGlobe = useMemo(() => new THREE.IcosahedronGeometry(1.8, 2), [])

  // Create latitude/longitude lines
  const latLines = useMemo(() => {
    const lines = []
    for (let i = -60; i <= 60; i += 30) {
      const radius = 2.05 * Math.cos((i * Math.PI) / 180)
      const y = 2.05 * Math.sin((i * Math.PI) / 180)
      const points = []
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2
        points.push(new THREE.Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle)))
      }
      lines.push(points)
    }
    for (let i = 0; i < 360; i += 30) {
      const points = []
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI
        const theta = (i * Math.PI) / 180
        points.push(new THREE.Vector3(
          2.05 * Math.sin(phi) * Math.cos(theta),
          2.05 * Math.cos(phi),
          2.05 * Math.sin(phi) * Math.sin(theta)
        ))
      }
      lines.push(points)
    }
    return lines
  }, [])

  // Particle field around globe
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < 1000; i++) {
      const r = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  // Data points on globe (representing projects/reach)
  const dataPoints = useMemo(() => {
    const points = []
    const locations = [
      { lat: 21.14, lng: 79.09 }, // Nagpur
      { lat: 37.77, lng: -122.42 }, // San Francisco
      { lat: 35.68, lng: 139.69 }, // Tokyo
      { lat: 51.51, lng: -0.13 }, // London
      { lat: -33.87, lng: 151.21 }, // Sydney
      { lat: 48.86, lng: 2.35 }, // Paris
      { lat: 1.35, lng: 103.82 }, // Singapore
      { lat: 55.76, lng: 37.62 }, // Moscow
    ]
    locations.forEach(loc => {
      const phi = (90 - loc.lat) * (Math.PI / 180)
      const theta = (loc.lng + 180) * (Math.PI / 180)
      points.push(new THREE.Vector3(
        -(2.1) * Math.sin(phi) * Math.cos(theta),
        (2.1) * Math.cos(phi),
        (2.1) * Math.sin(phi) * Math.sin(theta)
      ))
    })
    return points
  }, [])

  const { camera } = useThree()

  useFrame((state, delta) => {
    if (!globeRef.current) return

    if (phase === 'rotate') {
      globeRef.current.rotation.y += delta * 0.3
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

      // Animate rings
      ringsRef.current.forEach((ring, i) => {
        if (ring) {
          ring.rotation.x += delta * (0.2 + i * 0.1)
          ring.rotation.z += delta * (0.1 + i * 0.05)
        }
      })

      // Pulse data points
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.1
      }
    }

    if (phase === 'zoom') {
      zoomProgress.current += delta * 0.8
      const t = Math.min(zoomProgress.current, 1)
      const ease = 1 - Math.pow(1 - t, 3) // easeOutCubic

      camera.position.z = 8 - ease * 6
      camera.position.y = ease * 2
      globeRef.current.rotation.y += delta * (0.3 + ease * 5)
      globeRef.current.scale.setScalar(1 + ease * 2)

      // Fade out globe
      globeRef.current.traverse(child => {
        if (child.material) {
          child.material.opacity = Math.max(0, 1 - ease * 1.2)
        }
      })

      if (t >= 1) {
        setPhase('done')
        onZoomComplete()
      }
    }
  })

  return (
    <group ref={globeRef}>
      {/* Outer wireframe globe */}
      <mesh geometry={globeGeometry}>
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Inner solid globe */}
      <mesh geometry={innerGlobe}>
        <meshBasicMaterial color="#0a0a1a" transparent opacity={0.8} />
      </mesh>

      {/* Latitude/Longitude lines */}
      {latLines.map((points, i) => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={lineGeometry}>
            <lineBasicMaterial color="#00f0ff" transparent opacity={0.08} />
          </line>
        )
      })}

      {/* Glowing data points */}
      {dataPoints.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={i === 0 ? '#00ff88' : '#00f0ff'} />
        </mesh>
      ))}

      {/* Connection lines from Nagpur to other points */}
      {dataPoints.slice(1).map((point, i) => {
        const nagpur = dataPoints[0]
        const midPoint = new THREE.Vector3().addVectors(nagpur, point).multiplyScalar(0.5)
        midPoint.normalize().multiplyScalar(2.8)
        const curve = new THREE.QuadraticBezierCurve3(nagpur, midPoint, point)
        const linePoints = curve.getPoints(30)
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
        return (
          <line key={`conn-${i}`} geometry={lineGeometry}>
            <lineBasicMaterial color="#00f0ff" transparent opacity={0.2} />
          </line>
        )
      })}

      {/* Orbital rings */}
      <mesh ref={el => ringsRef.current[0] = el} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3, 0.005, 8, 100]} />
        <meshBasicMaterial color="#8000ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={el => ringsRef.current[1] = el} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.003, 8, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={el => ringsRef.current[2] = el} rotation={[Math.PI / 1.5, Math.PI / 6, 0]}>
        <torusGeometry args={[4, 0.004, 8, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
      </mesh>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00f0ff" size={0.02} transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  )
}

export default function GlobeIntro({ onComplete }) {
  const [started, setStarted] = useState(false)
  const [textPhase, setTextPhase] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTextPhase(1), 500)
    const t2 = setTimeout(() => setTextPhase(2), 1500)
    const t3 = setTimeout(() => setTextPhase(3), 2500)
    const t4 = setTimeout(() => setStarted(true), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  const handleZoomComplete = () => {
    setFadeOut(true)
    setTimeout(() => onComplete(), 800)
  }

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#030308]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <Globe onZoomComplete={handleZoomComplete} shouldZoom={started} />
            </Canvas>
          </div>

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#030308] pointer-events-none" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: textPhase >= 1 ? 1 : 0, y: textPhase >= 1 ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="text-xs tracking-[8px] text-cyber-cyan/60 mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
                {textPhase >= 1 ? 'INITIALIZING SECURE CONNECTION' : '\u00A0'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: textPhase >= 2 ? 1 : 0, scale: textPhase >= 2 ? 1 : 0.9 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1
                className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-2"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                <span className="text-white">YASH</span>
              </h1>
              <h1
                className="text-5xl sm:text-7xl lg:text-8xl font-bold"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                <span className="text-gradient-cyber">CHAVAN</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: textPhase >= 3 ? 1 : 0, y: textPhase >= 3 ? 0 : 10 }}
              transition={{ duration: 0.8 }}
              className="mt-6 text-center"
            >
              <div className="text-xs tracking-[5px] text-cyber-text-dim" style={{ fontFamily: 'Orbitron, monospace' }}>
                CYBER SECURITY <span className="text-cyber-cyan">×</span> FULL-STACK DEVELOPER
              </div>
              <div className="mt-4 flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[4px] text-cyber-green" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {started ? 'ACCESS GRANTED' : 'CONNECTING...'}
                </span>
              </div>
            </motion.div>

            {/* Scan lines */}
            <div className="absolute inset-0 scan-line pointer-events-none opacity-30" />
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 text-[10px] text-cyber-cyan/30" style={{ fontFamily: 'monospace' }}>
            SYS://GLOBE_v2.4.1<br />
            LAT: 21.1459° N<br />
            LNG: 79.0882° E
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] text-cyber-cyan/30 text-right" style={{ fontFamily: 'monospace' }}>
            PROTOCOL: SECURE<br />
            STATUS: {started ? 'ACTIVE' : 'PENDING'}<br />
            NODE: YASH-CHAVAN-01
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
