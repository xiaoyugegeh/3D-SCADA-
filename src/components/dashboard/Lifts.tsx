import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDashboardStore } from '@/store';
import { WAREHOUSE, floorY, getFloorVisibility } from '@/lib/warehouse';
import type { DeviceItem, FloorMode } from '@/types';

export function Lifts({ selectedFloor }: { selectedFloor: FloorMode }) {
  const lifts = useDashboardStore((state) => state.deviceList).filter((d) => d.type === 'lift');

  return (
    <group>
      {lifts.map((lift: DeviceItem) => (
        <LiftCar key={lift.id} lift={lift} visible={getFloorVisibility(selectedFloor, lift.floor)} />
      ))}
    </group>
  );
}

function LiftCar({ lift, visible }: { lift: DeviceItem; visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = floorY(lift.floor);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + 1 + Math.abs(Math.sin(clock.getElapsedTime() * 0.8 + lift.position.x)) * (WAREHOUSE.floorHeight - 3);
    }
  });

  return (
    <group visible={visible}>
      <mesh ref={ref} position={[lift.position.x, baseY + 2, lift.position.z]}>
        <boxGeometry args={[2.5, 1, 2]} />
        <meshStandardMaterial color="#f8fafc" emissive="#00d2ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[lift.position.x, baseY + WAREHOUSE.floorHeight / 2, lift.position.z]}>
        <boxGeometry args={[0.4, WAREHOUSE.floorHeight, 0.4]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  );
}
