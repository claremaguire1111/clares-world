// src/components/Character.jsx
import React from 'react';

export default function Character({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
