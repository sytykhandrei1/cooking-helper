import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import IngredientSearch from './components/IngredientSearch';
import RandomDish from './components/RandomDish';
import DishResults from './components/DishResults';
import Settings from './components/Settings';
import { dishes, dishCategories } from './data/dishes';
import { dishHasExcludedAllergen, eligibleRandomDishes, findDishesByIngredients, getDishFamily } from './utils/dishMatching';

function App() {
  const [currentView, setCurrentView] = useState('random');
  const [searchResults, setSearchResults] = useState([]);
  const [userAllergens, setUserAllergens] = useState([]);
  const [childMode, setChildMode] = useState(false);
  const [usedDishes, setUsedDishes] = useState([]);
  const [usedSideDishes, setUsedSideDishes] = useState([]);
  const [recentDishFamilies, setRecentDishFamilies] = useState([]);
  const [lastRandomCategory, setLastRandomCategory] = useState('all');
  const [lastSearchMode, setLastSearchMode] = useState('ingredients');

  // Функция поиска блюд по ингредиентам
  const searchDishesByIngredients = (selectedIngredients) => {
    const filteredDishes = findDishesByIngredients(dishes, selectedIngredients, {
      excludedAllergens: userAllergens,
      childMode,
    });
    setSearchResults(filteredDishes);
    setCurrentView('results');
    setLastSearchMode('ingredients');
  };

  // Функция случайного выбора блюда с категорией
  const getRandomDish = (category) => {
    const targetCategory = category || lastRandomCategory || 'all';

    // 1) выбираем самостоятельное блюдо, исключая гарниры
    const isMainCategory = (cat) => cat === 'breakfast' || cat === 'lunch' || cat === 'dinner';
    const mainCategoryFilter = isMainCategory(targetCategory) ? targetCategory : 'all';

    const eligibleMainsAll = eligibleRandomDishes(dishes, mainCategoryFilter, {
      excludedAllergens: userAllergens,
      childMode,
    });

    // Исключаем уже использованные основные блюда
    let eligibleMains = eligibleMainsAll.filter(dish => !usedDishes.includes(dish.id));
    if (eligibleMains.length === 0) {
      setUsedDishes([]);
      eligibleMains = eligibleMainsAll; // разрешаем повтор после сброса
    }

    // Разные рецепты одного семейства не должны идти серией: например,
    // несколько лингвини с разными соусами или несколько вариантов курицы.
    const diverseMains = eligibleMains.filter(dish => !recentDishFamilies.includes(getDishFamily(dish)));
    if (diverseMains.length > 0) eligibleMains = diverseMains;

    if (eligibleMains.length === 0) return; // нет основных блюд после всех фильтров

    const main = eligibleMains[Math.floor(Math.random() * eligibleMains.length)];

    // 2) выбираем гарнир
    const eligibleSidesAll = dishes.filter(dish => {
      return dish.category === 'side' &&
        !dishHasExcludedAllergen(dish, userAllergens) &&
        (!childMode || dish.forChildren);
    });

    let eligibleSides = eligibleSidesAll;
    if (main.sideDishes && main.sideDishes.length > 0) {
      const preferred = eligibleSidesAll.filter(side =>
        main.sideDishes.some(name =>
          side.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(side.name.toLowerCase())
        )
      );
      if (preferred.length > 0) eligibleSides = preferred;
    }

    // Гарниры тоже работают как «мешок»: не повторяем их, пока не перебраны
    // все совместимые варианты.
    let unusedSides = eligibleSides.filter(side => !usedSideDishes.includes(side.id));
    if (unusedSides.length === 0 && eligibleSides.length > 0) {
      setUsedSideDishes([]);
      unusedSides = eligibleSides;
    }

    const side = !main.isCompleteDish && unusedSides.length > 0
      ? unusedSides[Math.floor(Math.random() * unusedSides.length)]
      : undefined;

    // 3) формируем результат как пара
    const result = side ? [main, side] : [main];

    // Запоминаем использованный основной
    setUsedDishes(prev => [...prev, main.id]);
    setRecentDishFamilies(prev => [...prev, getDishFamily(main)].slice(-12));
    if (side) setUsedSideDishes(prev => [...prev, side.id]);

    setSearchResults(result);
    setCurrentView('results');
    setLastRandomCategory(targetCategory);
    setLastSearchMode('random');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'random':
        return (
          <RandomDish 
            onGetRandom={getRandomDish}
            onBack={() => setCurrentView('random')}
            categories={dishCategories}
          />
        );
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
    <div className="App">
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

export default App;
