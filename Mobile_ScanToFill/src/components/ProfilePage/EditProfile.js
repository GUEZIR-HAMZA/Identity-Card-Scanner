import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons,SimpleLineIcons,FontAwesome,AntDesign, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

export default function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission d'accès à la bibliothèque de médias refusée.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
  
    if (!result.canceled) {
      // Utilisons result.assets[0].uri pour accéder à l'URI de la première image sélectionnée
      setProfileImage(result.assets[0].uri);
    }
  };
  
  
  

  const handleSave = () => {
    // Ajoutez ici la logique pour sauvegarder les données dans le backend que j ai pas 
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleImagePicker('profile')}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profilePhoto}
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text>Photo de profil</Text>
            </View>
          )}
        </TouchableOpacity>
      
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
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
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
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
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
      
      
      <TouchableOpacity onPress={handleSave} style={{
          backgroundColor: '#003366',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          minHeight: 30,
          minWidth: 320,
          borderWidth: 1,
          borderColor: '#003366',
          borderRadius: 10,
          padding: 15,
          marginTop: 90,
          marginBottom:20,
          
          
        }}>
          <Text style={{ fontSize:17, color: 'white', textAlign: 'center' }}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white',
  },
  profilePlaceholder: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginTop: 30, // Pour superposer le cercle de profil sur la photo de couverture
    marginRight: 0,
    borderWidth: 1.3,
    borderColor: '#003366',
    borderRadius: 5,
    marginBottom:40,
  },
  profilePhoto: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginTop: 30, // Superposition
    marginRight: 0,
    borderWidth: 1.3,
    borderRadius: 5,
    marginBottom:30,
  },
  nameContainer: {
    flexDirection: 'row', // Aligner les éléments côte à côte
    justifyContent: 'space-between', // Espacement entre les éléments
    width: '82%',
    marginBottom: 0,
    alignItems: 'center',
    marginLeft:18,
    marginRight:18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: '48%', // Utilisez 48% pour que les éléments tiennent dans la même ligne avec un petit espacement entre eux
    backgroundColor: 'white',
    minHeight: 30,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
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
});