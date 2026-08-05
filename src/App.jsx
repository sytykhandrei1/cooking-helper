import React, { useState } from 'react';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import { useMobileLayout } from './utils/layout';

function App() {
  const isMobile = useMobileLayout();
  const [userAllergens, setUserAllergens] = useState([]);
  const [childMode, setChildMode] = useState(false);

  const sharedPreferences = {
    userAllergens,
    setUserAllergens,
    childMode,
    setChildMode,
  };

  return isMobile
    ? <MobileApp {...sharedPreferences} />
    : <DesktopApp {...sharedPreferences} />;
}

export default App;
