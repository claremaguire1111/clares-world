// src/pages/FirstClimbPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function FirstClimbPage() {
  return (
    <div className="page">
      <h1>First Climb</h1>
      <Link to="/">Back to Mountain</Link>
    </div>
  );
}
