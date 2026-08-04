import React from 'react';

const CloseButton = ({ onClick, label = 'Закрыть', className = '' }) => (
  <button
    className={`close-button ${className}`.trim()}
    type="button"
    onClick={onClick}
    aria-label={label}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.317 20.4484C3.8551 19.9972 3.8659 19.2023 4.317 18.7619L10.9235 12.1447L4.317 5.5382C3.8659 5.0978 3.8551 4.3136 4.317 3.841C4.7789 3.379 5.5631 3.3898 6.0143 3.841L12.6207 10.4474L19.2272 3.841C19.6891 3.3898 20.4518 3.3898 20.9244 3.8517C21.3971 4.3029 21.3864 5.087 20.9352 5.5382L14.3287 12.1447L20.9352 18.7619C21.3864 19.213 21.3864 19.9865 20.9244 20.4484C20.4625 20.921 19.6891 20.9103 19.2272 20.4591L12.6207 13.8527L6.0143 20.4591C5.5631 20.9103 4.7897 20.9103 4.317 20.4484Z"
        fill="currentColor"
      />
    </svg>
  </button>
);

export default CloseButton;
