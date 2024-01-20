import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ChangePasswordScreen = ({ navigation }) => {
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    if (currentPassword === '') {
      setErrorMessage('Veuillez saisir votre mot de passe actuel.');
    } else if (newPassword === '') {
      setErrorMessage('Veuillez saisir votre nouveau mot de passe.');
    } else if (newPassword !== confirmNewPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
    }  else {
      // la logique pour mettre à jour le mot de passe

      // Display success message
      Alert.alert('Mot de passe changé avec succès', 'Veuillez vous reconnecter.', [
        { text: 'Se déconnecter', onPress: () => handleLogout() }
      ]);

      // Une fois la mise à jour effectuée avec succès on réinitialise les champs.
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setErrorMessage('');
    }
  };
  const handleLogout = () => {
    // Add logic to handle logout and navigate to the authentication screen
    // Example:
    navigation.navigate('Authentication'); // Replace 'Authentication' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veuillez remplir les champs suivant pour changer votre mot de passe</Text>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe actuel"
        value={currentPassword}
        secureTextEntry
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={newPassword}
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmNewPassword}
        secureTextEntry
        onChangeText={(text) => setConfirmNewPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: '80%',
    backgroundColor: 'white',
    minHeight: 30,
    minWidth: 320,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
