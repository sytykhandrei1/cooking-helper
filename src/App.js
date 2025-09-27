import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import IngredientSearch from './components/IngredientSearch';
import RandomDish from './components/RandomDish';
import DishResults from './components/DishResults';
import Settings from './components/Settings';
import { dishes, dishCategories } from './data/dishes';

function App() {
  const [currentView, setCurrentView] = useState('random');
  const [searchResults, setSearchResults] = useState([]);
  const [userAllergens, setUserAllergens] = useState([]);
  const [childMode, setChildMode] = useState(false);
  const [usedDishes, setUsedDishes] = useState([]);
  const [lastRandomCategory, setLastRandomCategory] = useState('all');
  const [lastSearchMode, setLastSearchMode] = useState('ingredients');

  // Функция поиска блюд по ингредиентам
  const searchDishesByIngredients = (selectedIngredients) => {
    const filteredDishes = dishes.filter(dish => {
      // Проверяем аллергены
      const hasAllergen = dish.allergens.some(allergen => 
        userAllergens.includes(allergen)
      );
      
      // Проверяем режим для детей
      const childModeCheck = childMode ? dish.forChildren : true;
      
      if (hasAllergen || !childModeCheck) return false;
      
      // Находим совпадающие ингредиенты
      const matchingIngredients = selectedIngredients.filter(ingredient => 
        dish.ingredients.some(dishIngredient => {
          const dishIngredientLower = dishIngredient.toLowerCase();
          const ingredientLower = ingredient.toLowerCase();
          
          // Точное совпадение
          if (dishIngredientLower === ingredientLower) return true;
          
          // Совпадение по словам (ингредиент должен быть отдельным словом)
          const words = dishIngredientLower.split(/[\s,]+/);
          return words.includes(ingredientLower);
        })
      );
      
      // Находим недостающие ингредиенты
      const missingIngredients = dish.ingredients.filter(dishIngredient => 
        !selectedIngredients.some(ingredient => {
          const dishIngredientLower = dishIngredient.toLowerCase();
          const ingredientLower = ingredient.toLowerCase();
          
          // Точное совпадение
          if (dishIngredientLower === ingredientLower) return true;
          
          // Совпадение по словам
          const words = dishIngredientLower.split(/[\s,]+/);
          return words.includes(ingredientLower);
        })
      );
      
      // Показываем блюдо если:
      // 1. Есть хотя бы 2 совпадающих ингредиента ИЛИ
      // 2. Есть все ингредиенты (полное совпадение) ИЛИ  
      // 3. Не хватает максимум 2 ингредиента (для предложений)
      const hasEnoughMatches = matchingIngredients.length >= 2;
      const hasAllIngredients = matchingIngredients.length === selectedIngredients.length;
      const canSuggest = missingIngredients.length <= 2 && matchingIngredients.length > 0;
      
      return (hasEnoughMatches || hasAllIngredients || canSuggest);
    }).map(dish => {
      // Добавляем информацию о недостающих ингредиентах
      const matchingIngredients = selectedIngredients.filter(ingredient => 
        dish.ingredients.some(dishIngredient => {
          const dishIngredientLower = dishIngredient.toLowerCase();
          const ingredientLower = ingredient.toLowerCase();
          
          if (dishIngredientLower === ingredientLower) return true;
          const words = dishIngredientLower.split(/[\s,]+/);
          return words.includes(ingredientLower);
        })
      );
      
      const missingIngredients = dish.ingredients.filter(dishIngredient => 
        !selectedIngredients.some(ingredient => {
          const dishIngredientLower = dishIngredient.toLowerCase();
          const ingredientLower = ingredient.toLowerCase();
          
          if (dishIngredientLower === ingredientLower) return true;
          const words = dishIngredientLower.split(/[\s,]+/);
          return words.includes(ingredientLower);
        })
      );
      
      return {
        ...dish,
        matchingIngredients,
        missingIngredients: missingIngredients.slice(0, 2), // Показываем максимум 2 недостающих
        isCompleteMatch: matchingIngredients.length === selectedIngredients.length
      };
    });
    
    setSearchResults(filteredDishes);
    setCurrentView('results');
    setLastSearchMode('ingredients');
  };

  // Функция случайного выбора блюда с категорией
  const getRandomDish = (category) => {
    const targetCategory = category || lastRandomCategory || 'all';

    // 1) выбираем основное блюдо (не гарнир и не полное блюдо)
    const isMainCategory = (cat) => cat === 'breakfast' || cat === 'lunch' || cat === 'dinner';
    const mainCategoryFilter = isMainCategory(targetCategory) ? targetCategory : 'all';

    const eligibleMainsAll = dishes.filter(dish => {
      const hasAllergen = dish.allergens.some(allergen => userAllergens.includes(allergen));
      const childModeCheck = childMode ? dish.forChildren : true;
      const categoryCheck = (mainCategoryFilter === 'all' && dish.category !== 'side') || dish.category === mainCategoryFilter;
      const notCompleteDish = !dish.isCompleteDish; // исключаем полные блюда
      return !hasAllergen && childModeCheck && categoryCheck && notCompleteDish;
    });

    // Исключаем уже использованные основные блюда
    let eligibleMains = eligibleMainsAll.filter(dish => !usedDishes.includes(dish.id));
    if (eligibleMains.length === 0) {
      setUsedDishes([]);
      eligibleMains = eligibleMainsAll; // разрешаем повтор после сброса
    }

    if (eligibleMains.length === 0) return; // нет основных блюд после всех фильтров

    const main = eligibleMains[Math.floor(Math.random() * eligibleMains.length)];

    // 2) выбираем гарнир
    const eligibleSidesAll = dishes.filter(dish => {
      const hasAllergen = dish.allergens.some(allergen => userAllergens.includes(allergen));
      const childModeCheck = childMode ? dish.forChildren : true;
      return !hasAllergen && childModeCheck && dish.category === 'side';
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

    const side = eligibleSides.length > 0
      ? eligibleSides[Math.floor(Math.random() * eligibleSides.length)]
      : undefined;

    // 3) формируем результат как пара
    const result = side ? [main, side] : [main];

    // Запоминаем использованный основной
    setUsedDishes(prev => [...prev, main.id]);

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
