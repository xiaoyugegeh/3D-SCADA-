import { useRef } from 'react';
import { Box as DreiBox, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { WAREHOUSE, floorY, getFloorVisibility } from '@/lib/warehouse';
import type { FloorMode } from '@/types';

export function BuildingShell({ selectedFloor }: { selectedFloor: FloorMode }) {
  const ref = useRef<THREE.Group>(null);
  const width = WAREHOUSE.width;
  const depth = WAREHOUSE.depth;
  const totalHeight = WAREHOUSE.floors * WAREHOUSE.floorHeight;

  return (
    <group ref={ref}>
      <DreiBox args={[width, totalHeight, depth]} position={[0, totalHeight / 2, 0]}>
        <meshBasicMaterial color="#0f172a" transparent opacity={0.15} side={THREE.BackSide} />
      </DreiBox>

      {Array.from({ length: WAREHOUSE.floors }, (_, i) => {
        const floor = i + 1;
        const visible = getFloorVisibility(selectedFloor, floor);
        const y = floorY(floor) + WAREHOUSE.floorHeight / 2;
        return (
          <group key={floor} visible={visible}>
            <Grid
              position={[0, floorY(floor), 0]}
              args={[width, depth]}
              cellSize={2}
              cellThickness={0.5}
              cellColor={floor === 1 ? '#00d2ff' : '#4facfe'}
              sectionSize={10}
              sectionThickness={1}
              sectionColor="#ffffff"
              fadeDistance={80}
              fadeStrength={1}
              infiniteGrid
            />
            {[
              [-width / 2, depth / 2],
              [width / 2, depth / 2],
              [width / 2, -depth / 2],
              [-width / 2, -depth / 2],
            ].map(([x, z], idx) => (
              <mesh key={idx} position={[x, y, z]}>
                <boxGeometry args={[0.8, WAREHOUSE.floorHeight, 0.8]} />
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} emissive="#0ea5e9" emissiveIntensity={0.3} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}
