// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About.jsx';
import Contact from './Contact.jsx';
import MailingList from './MailingList.jsx';
import Home from './Home.jsx'; // Import Home component

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/subscribe" element={<MailingList />} />
    </Routes>
  );
}









