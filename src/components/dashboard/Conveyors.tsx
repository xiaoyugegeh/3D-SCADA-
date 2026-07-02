import { WAREHOUSE } from '@/lib/warehouse';
import type { FloorMode } from '@/types';

export function Conveyors({ selectedFloor }: { selectedFloor: FloorMode }) {
  if (selectedFloor !== 'all' && selectedFloor !== 1) return null;

  return (
    <group>
      {[-10, 0, 10].map((z, idx) => (
        <mesh key={idx} position={[0, 0.4, z]}>
          <boxGeometry args={[WAREHOUSE.width - 8, 0.2, 1.8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
