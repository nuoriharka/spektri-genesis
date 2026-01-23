import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function FloatingSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#6D6AFF" roughness={0.3} metalness={0.7} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={0.7} />
          <FloatingSphere />
        </Canvas>
      </Suspense>
    </div>
  );
}
