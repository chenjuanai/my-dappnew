import React from 'react';

const SignatureModal = ({ onSign, onClose }) => {
  return (
    <div className="SignatureModal">
      <p>Signature Request</p>
      <button onClick={onSign}>Confirm Signature</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SignatureModal;
