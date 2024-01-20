import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,Linking} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';


const AuthenticationScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleFacebookLogin = () => {
      Linking.openURL("https://www.facebook.com/login");
      };
    const handleGoogleLogin = () => {
        Linking.openURL("https://accounts.google.com/signin");
    };
    const handleAppleLogin = () => {
        Linking.openURL("https://www.icloud.com/");
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const handleLogin = () => {
      
      // Vérifier que l'email est au bon format
      if (!isValidEmail(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }
  
      // 
      // Simulons une vérification réussie avec des informations statiques
      if (email === 'elmehdiines@gmail.com' && password === '1234'||password === 'inasaa' ) {
        navigation.navigate('BottomTabNavigator');
         // Ici, on peut rediriger l'utilisateur vers une autre page
    } else {
        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    };
  
    // Fonction pour vérifier le format de l'email
    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email); 
    };
    const handleRegister = () => {
      // lorsque le bouton d'inscription est cliqué
      //console.log("Bouton d'inscription cliqué");
      navigation.navigate('Registration');
    };
  return (
    <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center' , backgroundColor:'#fff'}}>
      <Text style={{ fontSize: 22, fontWeight: 'normal',marginBottom: 0, marginTop:10}}>Authentification</Text>
      
      <Text style={{fontSize: 25, fontWeight: 'bold',marginTop: 17,}}>Bienvenue !</Text>
      <Image
          source={require('../../../assets/stf1.png')}
          style={styles.logo}
        />
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 15,
          marginTop: 30,
          width: '80%',
          backgroundColor: 'white',
          minHeight: 30,
          minWidth: 320,
        }}
      />
      
      <View style={{ position: 'relative' }}>
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            width: '80%',
            backgroundColor: 'white',
            minHeight: 30,
            minWidth: 320,
          }}
        />

        <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', top:20, right: 20 }}>
          <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => console.log("Mot de passe oublié?")}>
        <Text style={{ marginTop: 10 ,textDecorationLine: 'underline', marginRight:135}}>Mot de passe oublié?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleLogin} style={{
          backgroundColor: '#003366',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          minHeight: 30,
          minWidth: 320,
          marginTop: 35,
          marginBottom: 15,
        }}>
        <Text style={{ fontSize:17, color: 'white', textAlign: 'center' }}>Connexion</Text>
      </TouchableOpacity>
      
      <Text style={{ marginTop: 20, fontSize: 16, color:'#ccc' }}>Se connecter avec</Text>
      <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8}}>
        <TouchableOpacity onPress={handleFacebookLogin}>
          <FontAwesome name="facebook" size={37} style={{ marginRight: 45}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleLogin}>
          <FontAwesome name="google" size={37} style={{ marginRight: 45 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppleLogin}>
          <FontAwesome name="apple" size={37} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 25, fontSize: 16 }}>Vous n'avez pas de compte?</Text>
      
      <TouchableOpacity onPress={handleRegister} style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          minHeight: 30,
          minWidth: 320,
          borderWidth: 1,
          borderColor: '#003366',
          borderRadius: 10,
          padding: 15,
          marginTop: 10,
          
        }}>
        <Text style={{ fontSize:17, color: '#003366', textAlign: 'center' }}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
 
  logo:{
    width: 130,
    height: 136,
    marginBottom:0,
    marginTop: 2,
    },
  
});

export default AuthenticationScreen;
