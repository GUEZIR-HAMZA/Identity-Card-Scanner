import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './src/components/AuthenticationScreen';
import Registration from './src/components/Registration'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfilePage from './src/components/ProfilePage';
import AccueilPage from './src/components/AcceuilPage';
import BottomTabNavigator from './src/components/Bottom-tab-nav/index';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{ headerShown: false }} // Masquer l'en-tête
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTransparent: true, // Rendre l'en-tête transparent
            headerBackTitleVisible: false, // Masquer le texte "Retour" à côté de la flèche
            headerTitle: '',
            headerTintColor: '#c28540', // Personnaliser la couleur de la flèche de retour
          }}
        />
        <Stack.Screen  
          name="BottomTabNavigator" 
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccueilPage"
          component={AccueilPage}
          options={{ headerShown: false }} // Masquer l'en-tête
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
         // options={{ headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
