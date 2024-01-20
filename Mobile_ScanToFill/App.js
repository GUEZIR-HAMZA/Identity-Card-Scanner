import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './src/components/AuthenticationScreen';
import Registration from './src/components/Registration'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfilePage from './src/components/ProfilePage';
import AccueilPage from './src/components/AcceuilPage';
import BottomTabNavigator from './src/components/Bottom-tab-nav/index';
import EditProfile from './src/components/ProfilePage/EditProfile';
import AboutUs from './src/components/ProfilePage/aboutUs';
import ChangePasswordScreen from './src/components/ProfilePage/EditPwd'
import ContactUsScreen from './src/components/ProfilePage/ContactUs';

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
            headerTintColor: '#003366', // Personnaliser la couleur de la flèche de retour
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
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTransparent: false, 
            headerBackTitleVisible: false, 
            headerTitle: 'Modifier votre profile',
            headerTintColor: '#003366',
          }}
        />

        <Stack.Screen
          name="About Us"
          component={AboutUs}
          options={{
            headerTransparent: false, 
            headerBackTitleVisible: false, 
            headerTitle: 'About Us',
            headerTintColor: '#003366',
          }}
        />

        <Stack.Screen
          name="EditMdp"
          component={ChangePasswordScreen}
          options={{
            headerTransparent: false, 
            headerBackTitleVisible: false, 
            headerTitle: 'Changer le mot de passe',
            headerTintColor: '#003366',
          }}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{
            headerTransparent: true, 
            headerBackTitleVisible: false, 
            headerTitle: '',
            headerTintColor: '#003366',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
