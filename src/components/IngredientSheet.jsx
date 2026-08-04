import React, { useMemo, useState } from 'react';
import { Check, Plus, Search, X } from 'lucide-react';
import BottomSheet from './BottomSheet';
import { allIngredients } from '../data/dishes';

const IngredientSheet = ({ open, selected, onChange, onSubmit, onClose, error }) => {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleIngredients = useMemo(() => allIngredients
    .filter((ingredient) => !normalizedQuery || ingredient.toLowerCase().includes(normalizedQuery))
    .slice(0, 80), [normalizedQuery]);
  const exactExists = allIngredients.some((ingredient) => ingredient.toLowerCase() === normalizedQuery);

  const toggle = (ingredient) => {
    onChange(selected.includes(ingredient)
      ? selected.filter((item) => item !== ingredient)
      : [...selected, ingredient]);
  };

  const addCustom = () => {
    const value = query.trim().toLowerCase();
    if (!value || selected.includes(value)) return;
    onChange([...selected, value]);
    setQuery('');
  };

  return (
    <BottomSheet
      open={open}
      title="Что есть дома?"
      onClose={onClose}
      footer={(
        <button
          className="sheet-primary-action"
          type="button"
          disabled={!selected.length}
          onClick={() => onSubmit()}
        >
          Собрать блюдо
        </button>
      )}
    >
      <label className="sheet-search">
        <Search size={19} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && addCustom()}
          placeholder="Найти или добавить продукт"
        />
      </label>

      {selected.length > 0 && (
        <div className="selected-chips" aria-label="Выбранные продукты">
          {selected.map((ingredient) => (
            <button type="button" key={ingredient} onClick={() => toggle(ingredient)}>
              {ingredient}<X size={14} />
            </button>
          ))}
        </div>
      )}

      {error && <p className="sheet-error" role="status">{error}</p>}

      <div className="ingredient-picker">
        {!exactExists && normalizedQuery && (
          <button className="ingredient-row ingredient-row--custom" type="button" onClick={addCustom}>
            <Plus size={19} />
            <span>Добавить «{query.trim()}»</span>
          </button>
        )}
        {visibleIngredients.map((ingredient) => {
          const checked = selected.includes(ingredient);
          return (
            <button
              className={`ingredient-row ${checked ? 'is-selected' : ''}`}
              type="button"
              key={ingredient}
              aria-pressed={checked}
              onClick={() => toggle(ingredient)}
            >
              <span>{ingredient}</span>
              <span className="ingredient-check" aria-hidden="true">{checked && <Check size={15} />}</span>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
};

export default IngredientSheet;
