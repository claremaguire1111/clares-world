import React from 'react';
import './MailingList.css';
import './fonts.css'; 

export default function MailingList() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>Subscribe</h1> {/* Apostrophe fixed */}
      <form action="https://formspree.io/f/mzzbbebv" method="POST">
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}



