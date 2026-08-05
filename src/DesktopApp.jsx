import React, { useState } from 'react';
import './DesktopApp.css';
import Header from './components/Header';
import IngredientSearch from './components/IngredientSearch';
import RandomDish from './components/RandomDish';
import DishResults from './components/DishResults';
import Settings from './components/Settings';
import { dishes, dishCategories } from './data/dishes';
import { eligibleRandomDishes, findDishesByIngredients, getDishFamily } from './utils/dishMatching';

function DesktopApp({ userAllergens, setUserAllergens, childMode, setChildMode }) {
  const [currentView, setCurrentView] = useState('random');
  const [searchResults, setSearchResults] = useState([]);
  const [usedDishes, setUsedDishes] = useState([]);
  const [recentDishFamilies, setRecentDishFamilies] = useState([]);
  const [lastRandomCategory, setLastRandomCategory] = useState('all');
  const [lastSearchMode, setLastSearchMode] = useState('ingredients');

  const searchDishesByIngredients = (selectedIngredients) => {
    const filteredDishes = findDishesByIngredients(dishes, selectedIngredients, {
      excludedAllergens: userAllergens,
      childMode,
    });
    setSearchResults(filteredDishes);
    setCurrentView('results');
    setLastSearchMode('ingredients');
  };

  const getRandomDish = (category) => {
    const targetCategory = category || lastRandomCategory || 'all';
    const eligibleDishes = eligibleRandomDishes(dishes, targetCategory, {
      excludedAllergens: userAllergens,
      childMode,
    });

    let available = eligibleDishes.filter((dish) => !usedDishes.includes(dish.id));
    if (!available.length) {
      setUsedDishes([]);
      available = eligibleDishes;
    }

    const diverse = available.filter((dish) => !recentDishFamilies.includes(getDishFamily(dish)));
    if (diverse.length) available = diverse;
    if (!available.length) return;

    const selected = available[Math.floor(Math.random() * available.length)];
    setUsedDishes((current) => [...current, selected.id]);
    setRecentDishFamilies((current) => [...current, getDishFamily(selected)].slice(-12));
    setSearchResults([selected]);
    setCurrentView('results');
    setLastRandomCategory(targetCategory);
    setLastSearchMode('random');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'ingredients':
        return (
          <IngredientSearch
            onSearch={searchDishesByIngredients}
            onBack={() => setCurrentView('random')}
          />
        );
      case 'results':
        return (
          <DishResults
            dishes={searchResults}
            onBack={() => setCurrentView('random')}
            showAnotherRandom={lastSearchMode === 'random'}
            onGetAnotherRandom={() => getRandomDish(lastRandomCategory)}
          />
        );
      case 'settings':
        return (
          <Settings
            userAllergens={userAllergens}
            setUserAllergens={setUserAllergens}
            childMode={childMode}
            setChildMode={setChildMode}
            onBack={() => setCurrentView('random')}
          />
        );
      case 'random':
      default:
        return (
          <RandomDish
            onGetRandom={getRandomDish}
            onBack={() => setCurrentView('random')}
            categories={dishCategories}
          />
        );
    }
  };

  return (
    <div className="App desktop-app" data-layout="desktop">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        childMode={childMode}
        userAllergens={userAllergens}
        onRandomDish={getRandomDish}
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default DesktopApp;
