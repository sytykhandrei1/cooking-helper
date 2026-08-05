import React, { useEffect, useMemo, useRef, useState } from 'react';
import prepArtwork from '../assets/featured-dish/step-prep-square.png';
import panArtwork from '../assets/featured-dish/step-pan-square.png';
import finishArtwork from '../assets/featured-dish/step-finish-square.png';
import CloseButton from './CloseButton';
import IngredientComposition from './IngredientComposition';

const stepArtwork = [prepArtwork, panArtwork, finishArtwork];

const parseRecipe = (recipe = '') => {
  const steps = recipe
    .replace(/\s+(?=\d+\.\s)/g, '\n')
    .split('\n')
    .map((step) => step.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
  return steps.length ? steps : ['Подготовьте ингредиенты и приготовьте блюдо до готовности.'];
};

const DishOverlay = ({ dish, onClose, onAnother, actionLabel = 'Новое блюдо' }) => {
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const steps = useMemo(() => parseRecipe(dish?.recipe), [dish]);
  const servings = dish?.servings || 4;
  const timeMinutes = dish?.timeMinutes || Math.max(20, steps.length * 10);

  useEffect(() => {
    if (!dish) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dish, onClose]);

  useEffect(() => {
    setScrolled(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [dish?.id]);

  if (!dish) return null;

  return (
    <section className="recipe-overlay" role="dialog" aria-modal="true" aria-label={`Рецепт: ${dish.name}`}>
      <div
        className="recipe-overlay__scroll"
        ref={scrollRef}
        tabIndex={-1}
        aria-label="Содержимое рецепта"
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 116)}
      >
        <header className={`recipe-topbar ${scrolled ? 'is-scrolled' : ''}`}>
          <CloseButton onClick={onClose} label="Закрыть рецепт" />
          <div className="recipe-compact-title" aria-hidden={!scrolled}>
            <strong>{dish.name}</strong>
            <span>Порций {servings} · Время {timeMinutes} минут</span>
          </div>
        </header>

        <article className="recipe-content">
          <h1>{dish.name}</h1>
          <div className="recipe-meta">
            Порций {servings} · Время {timeMinutes} минут
          </div>

          <IngredientComposition dish={dish} />

          <section className="recipe-section recipe-ingredients">
            <h2>Ингредиенты</h2>
            <ul>
              {(dish.ingredients || []).map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
            </ul>
          </section>

          <section className="recipe-section recipe-process">
            <h2>Рецепт</h2>
            <ol>
              {steps.map((step, index) => (
                <li key={`${dish.id}-${index}`}>
                  <img
                    className="recipe-step-image"
                    src={stepArtwork[Math.min(index, stepArtwork.length - 1)]}
                    alt=""
                  />
                  <p>{index + 1}. {step}</p>
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>

      <div className="recipe-dock">
        <button type="button" onClick={onAnother}>
          {actionLabel}
        </button>
      </div>
    </section>
  );
};

export default DishOverlay;
