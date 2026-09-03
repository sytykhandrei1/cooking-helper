import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AllergenSheet from './components/AllergenSheet';
import IngredientSheet from './components/IngredientSheet';
import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import { DEFAULT_TAB } from './tabs';
import { ThemeProvider, useTheme } from './ThemeContext';
import { dishes } from '../data/dishes';
import { featuredDish } from '../data/featuredDish';
import { eligibleRandomDishes, findDishesByIngredients, getDishFamily } from '../utils/dishMatching';

const appDishes = [featuredDish, ...dishes];

// Состояние и подбор блюда перенесены из src/MobileApp.jsx без изменений логики.
const CookingHelper = () => {
  const { colors, isDark } = useTheme();

  const [userAllergens, setUserAllergens] = useState([]);
  const [childMode, setChildMode] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const [childToastVersion, setChildToastVersion] = useState(0);
  const [resultDish, setResultDish] = useState(null);
  const [resultSource, setResultSource] = useState('random');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientError, setIngredientError] = useState('');
  const [usedDishes, setUsedDishes] = useState([]);
  const [recentDishFamilies, setRecentDishFamilies] = useState([]);
  const [hasShownFeaturedDish, setHasShownFeaturedDish] = useState(false);

  const toggleAllergen = (allergen) => {
    setUserAllergens((current) => (current.includes(allergen)
      ? current.filter((item) => item !== allergen)
      : [...current, allergen]));
  };

  const toggleChildMode = () => {
    const nextValue = !childMode;
    setChildMode(nextValue);
    if (nextValue) setChildToastVersion((value) => value + 1);
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
      // Ошибку показываем в шторке выбора — там же её можно исправить.
      setIngredientError('Не нашли подходящего цельного блюда. Добавьте ещё один продукт или снимите фильтр.');
      setResultDish(null);
      setActiveSheet('ingredients');
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

  const openIngredientSheet = () => {
    setIngredientError('');
    setActiveSheet('ingredients');
  };

  const onMainAction = () => {
    if (activeTab === 'random') return chooseRandomDish();
    return selectedIngredients.length ? chooseFromIngredients() : openIngredientSheet();
  };

  const fromIngredients = resultSource === 'ingredients';

  return (
    <View style={[styles.shell, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <HomeScreen
        allergenCount={userAllergens.length}
        childMode={childMode}
        childToastVersion={childToastVersion}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedIngredients={selectedIngredients}
        onAllergens={() => setActiveSheet('allergens')}
        onChildMode={toggleChildMode}
        onMainAction={onMainAction}
        onEditIngredients={openIngredientSheet}
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
        onClose={() => setActiveSheet(null)}
        error={ingredientError}
      />
      <RecipeScreen
        dish={resultDish}
        onClose={() => setResultDish(null)}
        onAnother={fromIngredients
          ? () => chooseFromIngredients(resultDish?.id)
          : chooseRandomDish}
        actionLabel={fromIngredients ? 'Другое блюдо' : 'Новое блюдо'}
      />
    </View>
  );
};

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <CookingHelper />
    </ThemeProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({ shell: { flex: 1 } });

export default App;
