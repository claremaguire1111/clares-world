// src/Home.jsx
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html } from '@react-three/drei';
import { TextureLoader, Raycaster, Vector3 } from 'three';
import { useNavigate } from 'react-router-dom';

// Define the approximate pin positions in space (adjusted)
const pinStartPositions = [
  new Vector3(-1, 8, 0),    // Increased y for more accurate placement
  new Vector3(1, 9, -1.5),  // Adjusted y value to fit mountain surface
  new Vector3(0, 10, 0),
  new Vector3(-2, 9.5, 1),
  new Vector3(2, 8.5, 1),
  new Vector3(-0.5, 9, -2),
];

// Mountain model with textures
function MountainModel({ setMountainMesh }) {
  const { scene } = useGLTF('/models/mountscene.gltf'); // Load mountain model

  // Load all textures for the mountain
  const diffuse = useLoader(TextureLoader, '/models/textures/mountdefaultMat_diffuse.png');
  const normal = useLoader(TextureLoader, '/models/textures/mountdefaultMat_normal.png');
  const occlusion = useLoader(TextureLoader, '/models/textures/mountdefaultMat_occlusion.png');

  // Apply textures to the mountain mesh
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = diffuse;
      child.material.normalMap = normal;
      child.material.aoMap = occlusion;
      child.material.needsUpdate = true;
    }
  });

  // Save mountain mesh reference for raycasting
  setMountainMesh(scene);

  return <primitive object={scene} scale={5} position={[0, -2, 0]} />;
}

// Pin component for clickable actions
function Pin({ position, onClick, label }) {
  const pinRef = useRef();

  return (
    <mesh ref={pinRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.1, 32, 32]} /> {/* Small pin-like geometry */}
      <meshStandardMaterial color="red" />
      <Html position={[0, 0.3, 0]}>
        <div style={{ color: 'white', fontSize: '0.5rem', textAlign: 'center' }}>{label}</div>
      </Html>
    </mesh>
  );
}

export default function Home() {
  const [mountainMesh, setMountainMesh] = useState(null); // Mountain mesh reference for raycasting
  const [pinPositions, setPinPositions] = useState(pinStartPositions); // Pin positions, initially approximate
  const navigate = useNavigate();

  // Function to handle pin clicks
  const handlePinClick = (pinName) => {
    switch (pinName) {
      case 'about':
        navigate('/about');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'subscribe':
        navigate('/subscribe');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/clare-maguire-b587b7279/', '_blank');
        break;
      case 'x':
        window.open('https://twitter.com/claremaguire', '_blank');
        break;
      case 'instagram':
        window.open('https://instagram.com/claremaguire', '_blank');
        break;
      default:
        console.log('No matching action for pin.');
    }
  };

  // Function to update pin positions using raycasting
  useEffect(() => {
    if (mountainMesh) {
      const raycaster = new Raycaster();

      // Project pins onto mountain surface using raycasting
      const updatedPinPositions = pinStartPositions.map((pinPos) => {
        raycaster.set(pinPos, new Vector3(0, -1, 0)); // Cast ray downward

        // Find intersection with the mountain mesh
        const intersects = raycaster.intersectObject(mountainMesh, true);
        if (intersects.length > 0) {
          return intersects[0].point; // Set pin position at the intersection point
        } else {
          return pinPos; // If no intersection, return original position
        }
      });

      setPinPositions(updatedPinPositions); // Update pin positions
    }
  }, [mountainMesh]);

  return (
    <div style={{ position: 'relative' }}>
      <Canvas camera={{ position: [0, 10, 20], fov: 50 }} style={{ height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={<Html><div>Loading...</div></Html>}>
          {/* Load mountain model */}
          <MountainModel setMountainMesh={setMountainMesh} />

          {/* Render pins at updated positions */}
          {pinPositions.map((position, index) => (
            <Pin
              key={index}
              position={position}
              label={['about', 'contact', 'subscribe', 'linkedin', 'x', 'instagram'][index]}
              onClick={() => handlePinClick(['about', 'contact', 'subscribe', 'linkedin', 'x', 'instagram'][index])}
            />
          ))}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
