import React from 'react';
import ChildModeToast from './ChildModeToast';

const AllergenIcon = () => (
  <svg width="24" height="24" viewBox="80 96 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M89.3565 99.4658C90.545 97.5114 93.4551 97.5114 94.6436 99.4658L102.568 112.498C103.778 114.487 102.302 117 99.9249 117H84.0752C81.6978 117 80.2222 114.487 81.4317 112.498L89.3565 99.4658ZM91.75 111.999C91.1979 111.999 90.7502 112.373 90.75 112.834V114.504H92.25C92.8023 114.504 93.25 114.13 93.25 113.669V111.999H91.75ZM91.75 103.501C91.1978 103.501 90.7501 103.949 90.75 104.501V110.001H92.25C92.8023 110.001 93.25 109.553 93.25 109.001V103.501H91.75Z"
      fill="currentColor"
    />
  </svg>
);

const ChildIcon = () => (
  <svg width="24" height="24" viewBox="176 96 24 24" aria-hidden="true">
    <path d="M180 115.5C180 114.119 181.119 113 182.5 113H185V115.5C185 116.881 183.881 118 182.5 118C181.119 118 180 116.881 180 115.5Z" fill="currentColor" />
    <path d="M196 115.5C196 114.119 194.881 113 193.5 113H191V115.5C191 116.881 192.119 118 193.5 118C194.881 118 196 116.881 196 115.5Z" fill="currentColor" />
    <path d="M195.018 105C195.462 103.275 197.028 102 198.892 102H200.004V103.002C200.004 103.554 199.552 104.002 199 104.002C197.955 104.002 197.091 104.803 197 105.824V107C197 110.314 194.314 113 191 113H185C181.686 113 179 110.314 179 107V105H195.018Z" fill="currentColor" />
    <path d="M182.091 98.002L188.499 105L179 105V103.81C179 101.391 180.226 99.2595 182.091 98.002Z" fill="currentColor" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="272.5 96 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M294.027 102.5V113.5L284.501 119L274.975 113.5V102.5L284.501 96.9998L294.027 102.5ZM284.495 104.029C282.286 104.029 280.495 105.82 280.495 108.029C280.495 110.238 282.286 112.029 284.495 112.029C286.704 112.029 288.495 110.238 288.495 108.029C288.495 105.82 286.704 104.029 284.495 104.029Z"
      fill="currentColor"
    />
  </svg>
);

const MobileHome = ({ allergenCount, childMode, childToastVersion, onAllergens, onChildMode, onRandom, onIngredients }) => (
  <main className="mobile-home">
    {childMode && childToastVersion > 0 && <ChildModeToast key={childToastVersion} />}
    <header className="home-controls" aria-label="Фильтры блюда">
      <button
        className={`round-control ${allergenCount ? 'is-active' : ''}`}
        type="button"
        onClick={onAllergens}
        aria-label={`Аллергены${allergenCount ? `: выбрано ${allergenCount}` : ''}`}
      >
        <AllergenIcon />
      </button>
      <button
        className={`round-control ${childMode ? 'is-active' : ''}`}
        type="button"
        onClick={onChildMode}
        aria-label="Детский режим"
        aria-pressed={childMode}
      >
        <ChildIcon />
      </button>
      <button className="round-control" type="button" aria-label="Настройки">
        <SettingsIcon />
      </button>
    </header>

    <section className="home-actions" aria-label="Выбор способа">
      <button className="home-action-card" type="button" onClick={onRandom}>
        <strong>Реши за меня</strong>
      </button>
      <button className="home-action-card" type="button" onClick={onIngredients}>
        <strong>Соберу сам</strong>
      </button>
    </section>
  </main>
);

export default MobileHome;
