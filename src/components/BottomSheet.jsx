import React, { useEffect } from 'react';
import CloseButton from './CloseButton';

const BottomSheet = ({ open, title, description, onClose, children, footer }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="sheet-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="bottom-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <header className="bottom-sheet__header">
          <CloseButton className="bottom-sheet__close" onClick={onClose} />
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
        </header>
        <div className="bottom-sheet__content">{children}</div>
        {footer && <footer className="bottom-sheet__footer">{footer}</footer>}
      </section>
    </div>
  );
};

export default BottomSheet;
