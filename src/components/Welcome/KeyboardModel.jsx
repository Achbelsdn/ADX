import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';

const glbPath = import.meta.env.BASE_URL + 'mechanical_keyboard.glb';

function Model(props) {
  const { scene } = useGLTF(glbPath);
  return <primitive object={scene} {...props} />;
}

export default function KeyboardModel() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, 10, -5]} intensity={1} />
          <Environment preset="city" />
          <Center>
            <Model position={[0, 0, 0]} scale={0.5} />
          </Center>
          <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1.5} />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(glbPath);
