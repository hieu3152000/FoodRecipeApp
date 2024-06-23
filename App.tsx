// App.js or index.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigator'; // Your main navigator component

function App() {
  return (

      <AppNavigation />

  );
}

export default App;
