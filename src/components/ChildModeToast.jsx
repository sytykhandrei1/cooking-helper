import React, { useEffect, useState } from 'react';

const ChildModeToast = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showFrame = window.requestAnimationFrame(() => setVisible(true));
    const hideTimer = window.setTimeout(() => setVisible(false), 2800);

    return () => {
      window.cancelAnimationFrame(showFrame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`child-mode-toast ${visible ? 'is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <svg width="22" height="22" viewBox="176 96 24 24" aria-hidden="true">
        <path d="M180 115.5C180 114.119 181.119 113 182.5 113H185V115.5C185 116.881 183.881 118 182.5 118C181.119 118 180 116.881 180 115.5Z" fill="currentColor" />
        <path d="M196 115.5C196 114.119 194.881 113 193.5 113H191V115.5C191 116.881 192.119 118 193.5 118C194.881 118 196 116.881 196 115.5Z" fill="currentColor" />
        <path d="M195.018 105C195.462 103.275 197.028 102 198.892 102H200.004V103.002C200.004 103.554 199.552 104.002 199 104.002C197.955 104.002 197.091 104.803 197 105.824V107C197 110.314 194.314 113 191 113H185C181.686 113 179 110.314 179 107V105H195.018Z" fill="currentColor" />
        <path d="M182.091 98.002L188.499 105L179 105V103.81C179 101.391 180.226 99.2595 182.091 98.002Z" fill="currentColor" />
      </svg>
      <span>Детский режим включен, учтем это в блюдах</span>
    </div>
  );
};

export default ChildModeToast;
