import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import ProfilePage from '../ProfilePage';
import AcceuilPage from '../AcceuilPage'  // Update this line








// Define your screens
const HomeScreenComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreenComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  
    <Tab.Navigator>
      <Tab.Screen
        name="Accueil"  //nom en haut
        component={AcceuilPage}
        options={{
          tabBarLabel: 'Accueil', // nom de l'icone 
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="home" size={size} color={focused ? '#003366' : color} />
          ),
          headerShown: false, // Cacher l'en-tête
        }}
      />
      
      
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={({ navigation }) => ({
          tabBarLabel: 'profile',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={focused ? '#003366' : color} />
            
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color="#003366" style={{ marginLeft: 15}} />
            </TouchableOpacity>
          ),
          headerShown: false, // Cacher l'en-tête
        })}
      />
      


    </Tab.Navigator>
  
);

export default BottomTabNavigator;
