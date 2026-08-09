import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function OrbitalObject({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const accent = theme === "light" ? "#d75d3f" : "#ee7757";
  const line = theme === "light" ? "#7c766b" : "#aaa496";
  const signal = theme === "light" ? "#9bab55" : "#b8c66e";

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += (state.pointer.y * 0.16 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (-state.pointer.x * 0.12 - group.current.rotation.z) * 0.035;
    if (core.current) {
      core.current.rotation.y += delta * 0.22;
      core.current.rotation.x += delta * 0.08;
      core.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.08;
    }
  });

  return (
    <group ref={group} rotation={[0.12, -0.2, -0.2]}>
      <mesh rotation={[Math.PI / 2.6, 0.2, 0]} scale={[1.8, 1.05, 1.35]}>
        <torusGeometry args={[1.45, 0.008, 8, 160]} />
        <meshBasicMaterial color={line} transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.35, Math.PI / 2.4, 0.45]} scale={[1.2, 1.8, 1.1]}>
        <torusGeometry args={[1.36, 0.007, 8, 160]} />
        <meshBasicMaterial color={line} transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[1.05, 0.4, -0.35]} scale={[1.45, 1.45, 1]}>
        <torusGeometry args={[1.24, 0.006, 8, 160]} />
        <meshBasicMaterial color={line} transparent opacity={0.28} />
      </mesh>
      <mesh ref={core} scale={[0.92, 1.18, 0.82]} rotation={[0.2, 0.3, -0.12]}>
        <icosahedronGeometry args={[0.82, 6]} />
        <meshPhysicalMaterial color={accent} roughness={0.3} metalness={0.06} clearcoat={0.35} clearcoatRoughness={0.32} />
      </mesh>
      <mesh position={[-1.85, 0.82, 0.22]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color={signal} roughness={0.45} emissive={signal} emissiveIntensity={0.16} />
      </mesh>
    </group>
  );
}

export default function OrbitScene({ theme }: { theme: "light" | "dark" }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.5]} performance={{ min: 0.55 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[3, 4, 5]} intensity={2.8} color="#fff4df" />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#a8b66a" />
      <OrbitalObject theme={theme} />
    </Canvas>
  );
}
