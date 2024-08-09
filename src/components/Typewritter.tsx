import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [text],
      typeSpeed: 50, // Vitesse de frappe
    };

    const typed = new Typed(typewriterRef.current, options);

    return () => {
      typed.destroy();
    };
  }, [text]);

  return (
    <div>
      <span ref={typewriterRef}></span>
    </div>
  );
};

export default Typewriter;
