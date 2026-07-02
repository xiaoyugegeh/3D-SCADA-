import { useDashboardStore } from '@/store';
import type { DeviceItem, FloorMode } from '@/types';

export function Cameras({ selectedFloor }: { selectedFloor: FloorMode }) {
  if (selectedFloor !== 'all' && selectedFloor !== 1) return null;

  const cameras = useDashboardStore((state) => state.deviceList).filter((d) => d.type === 'camera');

  return (
    <group>
      {cameras.map((cam: DeviceItem) => (
        <mesh key={cam.id} position={[cam.position.x, cam.position.y, cam.position.z]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial
            color={cam.status === 'offline' ? '#94a3b8' : '#ef4444'}
            emissive="#ef4444"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
