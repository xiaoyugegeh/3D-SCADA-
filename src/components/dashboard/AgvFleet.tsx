import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDashboardStore } from '@/store';
import { getFloorVisibility } from '@/lib/warehouse';
import type { AgvItem, FloorMode } from '@/types';

const AGVCOLOR = '#e0f2fe';

export function AgvFleet({ selectedFloor }: { selectedFloor: FloorMode }) {
  const agvList = useDashboardStore((state) => state.agvList);
  const playing = useDashboardStore((state) => state.playing);

  return (
    <group>
      {agvList.map((agv) => (
        <AgvMesh key={agv.id} agv={agv} selectedFloor={selectedFloor} playing={playing} />
      ))}
    </group>
  );
}

function AgvMesh({ agv, selectedFloor, playing }: { agv: AgvItem; selectedFloor: FloorMode; playing: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(agv.position.x, agv.position.y, agv.position.z));
  const current = useRef(new THREE.Vector3(agv.position.x, agv.position.y, agv.position.z));

  useEffect(() => {
    target.current.set(agv.position.x, agv.position.y, agv.position.z);
  }, [agv.position.x, agv.position.y, agv.position.z]);

  useFrame((_, delta) => {
    if (!ref.current || !playing) return;
    current.current.lerp(target.current, delta * 2);
    ref.current.position.copy(current.current);
    const dx = target.current.x - current.current.x;
    const dz = target.current.z - current.current.z;
    if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) {
      ref.current.rotation.y = Math.atan2(dx, dz);
      ref.current.rotation.z = Math.sin(Date.now() * 0.005) * 0.05;
    }
  });

  const visible = getFloorVisibility(selectedFloor, agv.position.floor);
  const statusColor = agv.status === 'abnormal' ? '#ff3b30' : agv.status === 'charging' ? '#00e676' : '#00d2ff';

  return (
    <group ref={ref} visible={visible}>
      <mesh>
        <boxGeometry args={[2, 0.8, 1.4]} />
        <meshStandardMaterial color={AGVCOLOR} emissive={statusColor} emissiveIntensity={0.4} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshStandardMaterial color={statusColor} emissive={statusColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshBasicMaterial color={statusColor} />
      </mesh>
    </group>
  );
}
