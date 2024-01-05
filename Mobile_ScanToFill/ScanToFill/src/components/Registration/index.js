import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Registration = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const validatePhoneNumber = () => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);

    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      alert('Numéro de téléphone invalide');
    }
  };

  const handleRegistration = () => {
    // Vérifier que les champs ne sont pas vides
    if (
      firstName === '' ||
      lastName === '' ||
      phoneNumber === '' ||
      gender === '' ||
      email === '' ||
      password === ''||
      status === ''
    ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }
    // bouton d'inscription est cliqué
    navigation.navigate('Authentication');

    
    // Réinitialisons les champs après l'inscription
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setGender('');
    setEmail('');
    setPassword('');
    setStatus('');
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleAuthentication = () => {
    // lorsque le bouton d'inscription est cliqué
    //console.log("Bouton d'inscription cliqué");
    navigation.navigate('Authentication');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Image
          source={require('../../../assets/stf1.png')}
          style={styles.logo}
        />
      <View style={styles.nameContainer}>
        <TextInput
          placeholder="Prénom"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Nom"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
      </View>

      <TextInput
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad" // Affiche un clavier numérique
        onBlur={validatePhoneNumber} // Valider lorsque le champ perd le focus
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

      <View style={styles.pickerContainer}>
        <View style={styles.inputWrapper}>
          
          <RNPickerSelect
            placeholder={{
              label: 'Genre',
              value: '',
            }}
            items={[
              { label: 'Homme', value: 'homme' },
              { label: 'Femme', value: 'femme' },
            ]}
            onValueChange={(value) => setGender(value)}
            value={gender}
            
          />
        </View>
        <View style={styles.inputWrapper}>
          
          <RNPickerSelect
            placeholder={{
              label: 'Statut',
              value: '',
            }}
            items={[
              { label: 'Société', value: 'Société' },
              { label: 'étudiant', value: 'étudiant' },
            ]}
            onValueChange={(value) => setStatus(value)}
            value={status}
            
          />
        </View>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address" // Affiche un clavier pour les adresses e-mail
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

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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

      <TouchableOpacity onPress={handleRegistration} style={{
          backgroundColor: '#003366',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          minHeight: 30,
          minWidth: 320,
          marginTop: 35,
          marginBottom: 15,
          
        }}>
        <Text style={{ fontSize:17, color: 'white', textAlign: 'center' }}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 25, fontSize: 16 }}>Vous avez déja un compte?</Text>
      <TouchableOpacity onPress={handleAuthentication} style={{
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
          <Text style={{ fontSize:17, color: '#003366', textAlign: 'center' }}>Se connecter</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // verticale
    alignItems: 'center', //horizontalz
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo:{
    width: 130,
    height: 136,
    marginBottom: 10,
    marginTop: 2,
    },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    //flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
   // width: '100%',
    backgroundColor: 'white',
    minHeight: 30,
    minWidth: 155,
    //sjustifyContent: 'space-between',
    marginLeft:6,
    marginRight:6,
   
  },
  nameContainer: {
    flexDirection: 'row', // Aligner les éléments côte à côte
    justifyContent: 'space-between', // Espacement entre les éléments
    width: '92%',
    marginBottom: 0,
    alignItems: 'center',
    marginLeft:30,
    marginRight:18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: '48%', 
    backgroundColor: 'white',
    minHeight: 30,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop:10,
  },
  
  

});

export default Registration;