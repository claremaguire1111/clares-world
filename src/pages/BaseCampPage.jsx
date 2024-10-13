// src/pages/BaseCampPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function BaseCampPage() {
  return (
    <div className="page">
      <h1>Base Camp</h1>
      <Link to="/">Back to Mountain</Link>
    </div>
  );
}
