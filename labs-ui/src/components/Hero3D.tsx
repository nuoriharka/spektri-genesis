// 3D Hero for SUPER-AAAA landing page
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';

function FloatingSphere() {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#6D6AFF" roughness={0.25} metalness={0.7} envMapIntensity={1.2} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none h-full w-full">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 2]} intensity={1.2} castShadow />
          <FloatingSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
          <Environment preset="city" background={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
