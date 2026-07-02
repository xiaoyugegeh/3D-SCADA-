import { useMemo } from 'react';
import { WAREHOUSE, floorY, getFloorVisibility } from '@/lib/warehouse';
import type { FloorMode } from '@/types';

const SHELFCOLOR = '#0ea5e9';
const BEAMCOLOR = '#f97316';

export function Shelves({ selectedFloor }: { selectedFloor: FloorMode }) {
  const uprights = useMemo(() => {
    const list: { floor: number; x: number; z: number }[] = [];
    for (let f = 1; f <= WAREHOUSE.floors; f++) {
      for (let r = 0; r < WAREHOUSE.shelfRows; r++) {
        for (let c = 0; c < WAREHOUSE.shelfCols; c++) {
          const z = -WAREHOUSE.depth / 2 + 3 + r * 6;
          const x = -WAREHOUSE.width / 2 + 3 + c * 5.5 + (c >= 5 ? WAREHOUSE.aisleWidth : 0);
          list.push({ floor: f, x, z });
        }
      }
    }
    return list;
  }, []);

  return (
    <group>
      {uprights.map((s, idx) => {
        const visible = getFloorVisibility(selectedFloor, s.floor);
        const y = floorY(s.floor) + WAREHOUSE.floorHeight / 2;
        return (
          <group key={idx} position={[s.x, y, s.z]} visible={visible}>
            <mesh>
              <boxGeometry args={[0.3, WAREHOUSE.floorHeight - 1, 0.3]} />
              <meshStandardMaterial color={SHELFCOLOR} emissive="#0284c7" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
            </mesh>
            {[0, 1, 2, 3].map((level) => (
              <mesh key={level} position={[0, -WAREHOUSE.floorHeight / 2 + 1.5 + level * 2, 0]}>
                <boxGeometry args={[2.8, 0.15, 0.15]} />
                <meshStandardMaterial color={BEAMCOLOR} emissive="#c2410c" emissiveIntensity={0.2} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}
