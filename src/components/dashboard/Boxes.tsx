import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDashboardStore } from '@/store';
import { getFloorVisibility } from '@/lib/warehouse';
import type { BoxItem, FloorMode } from '@/types';

const BOXCOR = '#9ca3af';

export function SampleBoxes({ selectedFloor }: { selectedFloor: FloorMode }) {
  const locationList = useDashboardStore((state) => state.locationList);
  const selectedBox = useDashboardStore((state) => state.selectedBox);

  const occupied = useMemo(() => {
    return locationList.filter((l) => l.status === 'occupied').slice(0, 400);
  }, [locationList]);

  return (
    <group>
      {occupied.map((loc) => {
        const visible = getFloorVisibility(selectedFloor, loc.position.floor);
        const isSelected = selectedBox?.locationCode === loc.code;
        return (
          <mesh
            key={loc.id}
            position={[loc.position.x, loc.position.y, loc.position.z]}
            visible={visible && !isSelected}
          >
            <boxGeometry args={[1.6, 0.5, 1.2]} />
            <meshStandardMaterial color={BOXCOR} roughness={0.6} />
          </mesh>
        );
      })}
      {selectedBox && <SelectedBox box={selectedBox} />}
    </group>
  );
}

function SelectedBox({ box }: { box: BoxItem }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={meshRef} position={[box.position.x, box.position.y, box.position.z]}>
      <boxGeometry args={[1.8, 0.6, 1.4]} />
      <meshStandardMaterial color="#00e676" emissive="#00e676" emissiveIntensity={0.8} />
    </mesh>
  );
}
