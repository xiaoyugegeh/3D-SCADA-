import { useDashboardStore } from '@/store';
import type { DeviceItem, FloorMode } from '@/types';

export function ChargingStations({ selectedFloor }: { selectedFloor: FloorMode }) {
  if (selectedFloor !== 'all' && selectedFloor !== 1) return null;

  const stations = useDashboardStore((state) => state.deviceList).filter((d) => d.type === 'charging');

  return (
    <group>
      {stations.map((station: DeviceItem) => (
        <mesh key={station.id} position={[station.position.x, 0.15, station.position.z]}>
          <cylinderGeometry args={[1.2, 1.4, 0.3, 32]} />
          <meshStandardMaterial
            color={station.status === 'warning' ? '#ffca28' : '#00e676'}
            emissive={station.status === 'warning' ? '#ffca28' : '#00e676'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
