import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AccueilPage = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nomValue, setNomValue] = useState('');
  const [prenomValue, setPrenomValue] = useState('');

  const options = [
    { label: 'Carte d\'identité nationale', value: 'CIN' },
    { label: 'Passeport', value: 'Passeport' },
    { label: 'Carte bancaire', value: 'CarteBancaire' },
  ];

  useEffect(() => {
    // Demander la permission d'accéder à la galerie et à la caméra
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission d\'accès à la galerie refusée!');
      }
    })();
  }, []);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      // Envoyer l'image à votre API
      const formData = new FormData();
      formData.append('image', {
        uri: result.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpg',
      });

      try {
        const response = await axios.post('http://localhost:8000/api/upload_and_process_image/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Gérer la réponse de l'API ici, par exemple, afficher un message de succès.
        console.log(response.data);
      } catch (error) {
        // Gérer les erreurs de l'API ici, par exemple, afficher un message d'erreur.
        console.error(error);
      }
    }
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('documentType', selectedValue);
    formData.append('nom', nomValue);
    formData.append('prenom', prenomValue);

    try {
      const response = await axios.post('http://localhost:8000/api/upload_and_process_image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Gérer la réponse de l'API ici, par exemple, afficher un message de succès.
      console.log(response.data);
    } catch (error) {
      // Gérer les erreurs de l'API ici, par exemple, afficher un message d'erreur.
      console.error(error);
    }
  };

  const renderAdditionalFields = () => {
    if (selectedValue === 'CIN') {
      return (
        <>
          <TextInput
            placeholder="Nom"
            style={styles.input}
            value={nomValue}
            onChangeText={(text) => setNomValue(text)}
          />
          <TextInput
            placeholder="Prénom"
            style={styles.input}
            value={prenomValue}
            onChangeText={(text) => setPrenomValue(text)}
          />
          {/* ... other fields */}
        </>
      );
    } else if (selectedValue === 'Passeport') {
      return (
        <>
          {/* ... fields for passport */}
        </>
      );
    } else if (selectedValue === 'CarteBancaire') {
      return (
        <>
          {/* ... fields for credit card */}
        </>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>Bonjour :</Text>
      <Text style={styles.Text}>Transformez le papier en potentiel avec Scan to Fill : Numérisez, Complétez, Simplifiez.</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}  // Ajouter cette ligne pour cacher la barre de défilement
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sélectionnez un type de document :</Text>
          <RNPickerSelect
            placeholder={{ label: 'Choisissez un document', value: null }}
            items={options}
            onValueChange={(value) => {
              setSelectedValue(value);
              setNomValue('');
              setPrenomValue('');
            }}
            value={selectedValue}
          />
          <Text style={styles.selectedText}>Document sélectionné : {selectedValue}</Text>

          {renderAdditionalFields()}

          <TouchableOpacity onPress={pickImageFromGallery} style={styles.button}>
            <Text style={styles.buttonText}>Importer depuis la galerie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={submitForm} style={styles.button}>
            <Text style={styles.buttonText}>Soumettre le formulaire</Text>
          </TouchableOpacity>

          {selectedImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.selectedText}>Image sélectionnée :</Text>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 400,
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', // Couleur de fond
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50,
  },
  
  introText: {
    fontSize: 26,
    marginTop:60,
    marginBottom: 0,
    color: '#003366', // Bleu foncé
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Text: {
    fontSize: 20,
    marginTop:20,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft:-14,
    marginTop:0,
    color: '#003366', // Bleu foncé
    fontWeight: 'bold'
    
  },
  selectedText: {
    marginTop: 20,
    color: '#003366',
    marginBottom:10,
  },
  button: {
    backgroundColor: '#00539C', // Bleu moyen
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    minWidth: 320,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#003366', // Bleu foncé
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default AccueilPage;
