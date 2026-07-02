import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useDashboardStore } from '@/store';
import { floorY } from '@/lib/warehouse';

export function CameraController() {
  const { camera, controls } = useThree();
  const cameraTarget = useDashboardStore((state) => state.cameraTarget);
  const selectedFloor = useDashboardStore((state) => state.selectedFloor);

  useEffect(() => {
    if (cameraTarget && controls) {
      const target = new THREE.Vector3(...cameraTarget.target);
      const position = new THREE.Vector3(...cameraTarget.position);
      gsap.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      gsap.to((controls as any).target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [camera, controls, cameraTarget]);

  useEffect(() => {
    if (controls) {
      const targetY = selectedFloor === 'all' ? 20 : floorY(selectedFloor) + 5;
      const posY = selectedFloor === 'all' ? 60 : floorY(selectedFloor) + 25;
      const posZ = selectedFloor === 'all' ? 70 : 45;
      gsap.to(camera.position, { y: posY, z: posZ, duration: 1.2, ease: 'power2.inOut' });
      gsap.to((controls as any).target, { y: targetY, duration: 1.2, ease: 'power2.inOut' });
    }
  }, [camera, controls, selectedFloor]);

  return null;
}
