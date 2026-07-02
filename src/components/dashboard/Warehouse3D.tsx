import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Environment } from './Environment';
import { BuildingShell } from './Building';
import { Shelves } from './Shelves';
import { SampleBoxes } from './Boxes';
import { Conveyors } from './Conveyors';
import { ChargingStations } from './ChargingStations';
import { Cameras } from './Cameras';
import { Lifts } from './Lifts';
import { AgvFleet } from './AgvFleet';
import { CameraController } from './CameraController';
import { useDashboardStore } from '@/store';

function Scene() {
  const selectedFloor = useDashboardStore((state) => state.selectedFloor);

  return (
    <>
      <Environment />
      <BuildingShell selectedFloor={selectedFloor} />
      <Shelves selectedFloor={selectedFloor} />
      <SampleBoxes selectedFloor={selectedFloor} />
      <Conveyors selectedFloor={selectedFloor} />
      <ChargingStations selectedFloor={selectedFloor} />
      <Cameras selectedFloor={selectedFloor} />
      <Lifts selectedFloor={selectedFloor} />
      <AgvFleet selectedFloor={selectedFloor} />
      <OrbitControls makeDefault enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2 - 0.05} />
      <CameraController />
    </>
  );
}

export function Warehouse3D() {
  return (
    <Canvas
      camera={{ position: [50, 55, 70], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.6} />
      </EffectComposer>
    </Canvas>
  );
}
