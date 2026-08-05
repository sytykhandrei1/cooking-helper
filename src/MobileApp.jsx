import React, { useState } from 'react';
import './App.css';
import AllergenSheet from './components/AllergenSheet';
import DishOverlay from './components/DishOverlay';
import IngredientSheet from './components/IngredientSheet';
import MobileHome from './components/MobileHome';
import { dishes } from './data/dishes';
import { featuredDish } from './data/featuredDish';
import { eligibleRandomDishes, findDishesByIngredients, getDishFamily } from './utils/dishMatching';

const appDishes = [featuredDish, ...dishes];

function MobileApp({ userAllergens, setUserAllergens, childMode, setChildMode }) {
  const [activeSheet, setActiveSheet] = useState(null);
  const [resultDish, setResultDish] = useState(null);
  const [resultSource, setResultSource] = useState('random');
  const [childToastVersion, setChildToastVersion] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientError, setIngredientError] = useState('');
  const [usedDishes, setUsedDishes] = useState([]);
  const [recentDishFamilies, setRecentDishFamilies] = useState([]);
  const [hasShownFeaturedDish, setHasShownFeaturedDish] = useState(false);

  const toggleAllergen = (allergen) => {
    setUserAllergens((current) => current.includes(allergen)
      ? current.filter((item) => item !== allergen)
      : [...current, allergen]);
  };

  const chooseRandomDish = () => {
    const allEligible = eligibleRandomDishes(appDishes, 'all', {
      excludedAllergens: userAllergens,
      childMode,
    });
    let available = allEligible.filter((dish) => !usedDishes.includes(dish.id));
    if (!available.length) {
      setUsedDishes([]);
      available = allEligible;
    }
    const diverse = available.filter((dish) => !recentDishFamilies.includes(getDishFamily(dish)));
    if (diverse.length) available = diverse;
    if (!available.length) return;

    const canShowFeatured = !hasShownFeaturedDish;
    const featuredCandidate = canShowFeatured && available.find((dish) => dish.id === featuredDish.id);
    const selected = featuredCandidate || available[Math.floor(Math.random() * available.length)];

    setHasShownFeaturedDish(true);
    setUsedDishes((current) => [...current, selected.id]);
    setRecentDishFamilies((current) => [...current, getDishFamily(selected)].slice(-12));
    setResultSource('random');
    setResultDish(selected);
    setActiveSheet(null);
  };

  const chooseFromIngredients = (excludedDishId = null) => {
    const results = findDishesByIngredients(appDishes, selectedIngredients, {
      excludedAllergens: userAllergens,
      childMode,
    });
    if (!results.length) {
      setIngredientError('Не нашли подходящего цельного блюда. Добавьте ещё один продукт или снимите фильтр.');
      return;
    }
    const shortlist = results.slice(0, 8);
    const alternatives = shortlist.filter((dish) => dish.id !== excludedDishId);
    const available = alternatives.length ? alternatives : shortlist;
    setIngredientError('');
    setResultSource('ingredients');
    setResultDish(available[Math.floor(Math.random() * available.length)]);
    setActiveSheet(null);
  };

  const toggleChildMode = () => {
    const nextValue = !childMode;
    setChildMode(nextValue);
    if (nextValue) setChildToastVersion((value) => value + 1);
  };

  return (
    <div className="app-shell" data-layout="mobile">
      <MobileHome
        allergenCount={userAllergens.length}
        childMode={childMode}
        childToastVersion={childToastVersion}
        onAllergens={() => setActiveSheet('allergens')}
        onChildMode={toggleChildMode}
        onRandom={chooseRandomDish}
        onIngredients={() => {
          setIngredientError('');
          setActiveSheet('ingredients');
        }}
      />

      <AllergenSheet
        open={activeSheet === 'allergens'}
        selected={userAllergens}
        onToggle={toggleAllergen}
        onClose={() => setActiveSheet(null)}
      />
      <IngredientSheet
        open={activeSheet === 'ingredients'}
        selected={selectedIngredients}
        onChange={setSelectedIngredients}
        onSubmit={chooseFromIngredients}
        onClose={() => setActiveSheet(null)}
        error={ingredientError}
      />
      <DishOverlay
        dish={resultDish}
        onClose={() => setResultDish(null)}
        onAnother={resultSource === 'ingredients'
          ? () => chooseFromIngredients(resultDish?.id)
          : chooseRandomDish}
        actionLabel={resultSource === 'ingredients' ? 'Другое блюдо' : 'Новое блюдо'}
      />
    </div>
  );
}

export default MobileApp;
