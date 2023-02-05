import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import React, { useEffect } from 'react';
// import SplashScreen from './src/screens/SplashScreen';
import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Toaster } from 'react-native-customizable-toast';
import { AdminStack, LoginStack, MainStack } from './Navigation';
import { userState } from './src/store/AppState';

const App = () => {
  const user = useHookstate(userState);
  useEffect(async () => {
    SplashScreen.hide();
    const userAsync = await AsyncStorage.getItem('user');
    user.set(JSON.parse(userAsync));
  }, []);

  return (
    <>
      <NavigationContainer>
        {user.get() == null ? (
          <LoginStack />
        ) : user.get().isAdmin ? (
          <AdminStack />
        ) : (
          <MainStack />
        )}
      </NavigationContainer>
      <Toaster />
    </>
  );
};

export default App;
