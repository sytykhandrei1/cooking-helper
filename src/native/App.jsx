import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AllergenSheet from './components/AllergenSheet';
import HomeScreen from './screens/HomeScreen';
import { colors } from './theme';

// Корень React Native приложения: объединяет общие настройки из веб-версии
// src/App.jsx (аллергены, детский режим) и состояние шитов из src/MobileApp.jsx.
const App = () => {
  const [userAllergens, setUserAllergens] = useState([]);
  const [childMode, setChildMode] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [childToastVersion, setChildToastVersion] = useState(0);

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

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.shell}>
        <HomeScreen
          allergenCount={userAllergens.length}
          childMode={childMode}
          childToastVersion={childToastVersion}
          onAllergens={() => setActiveSheet('allergens')}
          onChildMode={toggleChildMode}
          // Подбор блюда и шит продуктов переносим на следующем шаге миграции:
          // логика в src/utils/dishMatching.js уже переносима как есть.
          onRandom={undefined}
          onIngredients={undefined}
        />

        <AllergenSheet
          open={activeSheet === 'allergens'}
          selected={userAllergens}
          onToggle={toggleAllergen}
          onClose={() => setActiveSheet(null)}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.black },
});

export default App;
