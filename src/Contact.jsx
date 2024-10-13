import React from 'react';
import './Contact.css';
import './fonts.css'; 


export default function Contact() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>Contact</h1>
      <form action="https://formspree.io/f/meoqqaql" method="POST">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

