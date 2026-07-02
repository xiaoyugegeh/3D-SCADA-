import { Stars } from '@react-three/drei';

export function Environment() {
  return (
    <>
      <color attach="background" args={['#050d24']} />
      <fog attach="fog" args={['#050d24', 40, 180]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 60, 30]} intensity={1.2} color="#e0f7ff" />
      <pointLight position={[-20, 40, -20]} intensity={0.6} color="#4facfe" />
      <Stars radius={120} depth={50} count={800} factor={4} saturation={0.5} fade speed={0.5} />
    </>
  );
}
