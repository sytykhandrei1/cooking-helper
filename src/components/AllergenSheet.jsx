import React from 'react';
import BottomSheet from './BottomSheet';
import { allergens } from '../data/dishes';

const capitalizeAllergen = (allergen) => `${allergen.charAt(0).toLocaleUpperCase('ru-RU')}${allergen.slice(1)}`;

const AllergenSheet = ({ open, selected, onToggle, onClose }) => (
  <BottomSheet
    open={open}
    title="Аллергены"
    onClose={onClose}
    footer={(
      <button className="sheet-primary-action" type="button" onClick={onClose}>
        Готово
      </button>
    )}
  >
    <div className="toggle-list">
      {allergens.map((allergen) => {
        const checked = selected.includes(allergen);
        return (
          <button
            className="toggle-row"
            type="button"
            key={allergen}
            aria-pressed={checked}
            onClick={() => onToggle(allergen)}
          >
            <span>{capitalizeAllergen(allergen)}</span>
            <span className={`switch ${checked ? 'is-on' : ''}`} aria-hidden="true">
              <span />
            </span>
          </button>
        );
      })}
    </div>
  </BottomSheet>
);

export default AllergenSheet;
