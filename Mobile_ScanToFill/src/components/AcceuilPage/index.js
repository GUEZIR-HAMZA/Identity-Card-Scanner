import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';
import { Animated } from 'react-native';



const AccueilPage = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalFields, setAdditionalFields] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numeroCIN, setNumeroCIN] = useState('');
  const [dateExpiration, setDateExpiration] = useState('');
  const [numPass, setNumPass] = useState('');
  const [TypePass, setTypePass] = useState('');
  const [codePass, setCodePass] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [sexe, setSexe] = useState('');
  const [autorite, setAutorité] = useState('');
  const [dateDelivrance, setDateDelivrance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName]= useState('');
  const [typePermis, setTypePermis] = useState('');
  const [delivrance, setDelivrance] = useState('');
  const [delivranceDate, setDelivranceDate] = useState('');
  const [detectedDocumentType, setDetectedDocumentType] = useState(null);
  


  const fadeAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour l'opacité

  useEffect(() => {
    if (detectedDocumentType) {
      // Animation de l'opacité de 0 à 1
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [detectedDocumentType, fadeAnim]);

  

  const resetFields = () => {
    setNom('');
    setPrenom('');
    setDateNaissance('');
    setAdresse('');
    setNumeroCIN('');
    setDateExpiration('');
    setNumPass('');
    setTypePass('');
    setCodePass('');
    setLieuNaissance('');
    setSexe('');
    setAutorité('');
    setDateDelivrance('');
    setName('');
    setNumber('');
    setTypePermis('');
    setDelivrance('');
    setDelivranceDate('');
    setDocumentNom('');
    setSelectedImage(null);
    setDetectedDocumentType(null);
    
    
    

    // Réinitialiser tout autre champ nécessaire
    setSelectedImage(null);
  };

  useEffect(() => {
  // Demander la permission d'accéder à la galerie et à la caméra
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission d\'accès à la galerie refusée!');
    }
  })();
}, []);

useEffect(() => {
  // Afficher l'alerte de confidentialité
  Alert.alert(
    "Respect de la vie privée",
    "Nous respectons votre vie privée. Cette application ne conserve pas vos informations personnelles.",
    [{ text: "OK", onPress: () => console.log("Alerte de confidentialité fermée") }]
  );
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
    }
  };


  const uploadImage = async () => {
  if (!selectedImage) {
    console.log('Aucune image sélectionnée pour le téléchargement');
    return;
  }
  setIsLoading(true);
  const formData = new FormData();
  const imageUri = selectedImage;
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  formData.append('image', {
    uri: imageUri,
    type: `image/${fileType}`, // Par exemple, 'image/jpeg' si l'URI se termine par .jpeg
    name: `upload.${fileType}`, // Par exemple, 'upload.jpeg'
  });

  console.log('Uploading image with URI:', imageUri);

  try {
    const response = await axios.post('http://192.168.11.103:8000/api/upload/', formData, {
      timeout: 100000,
    });
  
    console.log('Upload successful');
    console.log(response.data); // Pour vérifier la réponse
  
    const apiResponse = response.data.api_response;
    if (apiResponse && apiResponse.code === "200" && apiResponse.data) {
      if (apiResponse.data.ocr) {
        const ocrData = apiResponse.data.ocr;
        const documentName = apiResponse.data.documentName;
        setDetectedDocumentType(documentName);
      // Mise à jour des états avec les données de la réponse
      setNom(ocrData.surname); 
      setPrenom(ocrData.givenNames);
      setDateNaissance(ocrData.dateOfBirth);
      setAdresse(ocrData.address);
      setLieuNaissance(ocrData.placeOfBirth);
      setNumeroCIN(ocrData.documentNumber);
      setDateExpiration(ocrData.dateOfExpiry);
      setNumPass(ocrData.documentNumber);
      setTypePass(ocrData.documentClassCode);
      setCodePass(ocrData.issuingStateCode);
      setSexe(ocrData.sex);
      setAutorité(ocrData.authority);
      setDateDelivrance(ocrData.dateOfIssue);
      setName(ocrData.name);
      setTypePermis(ocrData.dLClass);
      setDelivrance(ocrData.placeOfIssue);
      setDelivranceDate(ocrData.firstIssueDate);
      
      console.log(ocrData);
      

      

    } else {
      console.error('Format de réponse inattendu', response.data);
    }
  } else {
    console.error('Format de réponse inattendu', response.data);
  }
  setIsLoading(false);
} catch (error) {
    console.error('Upload failed', error);
    setIsLoading(false);
  }
  
};

  
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const renderAdditionalFields = () => {
    switch (detectedDocumentType) {
      case 'Identity Card':
        return (
        <>
          <Animated.Text style={{ ...styles.documentTypeHeader, opacity: fadeAnim }}>
              Carte d'Identité Nationale
            </Animated.Text>
          <Text style={styles.documentTypeHeader}>Carte d'Identité Nationale</Text>
          <TextInput placeholder="Nom" value={nom} style={styles.input} />
          <TextInput placeholder="Prénom"value={prenom} style={styles.input} />
          <TextInput placeholder="Date de naissance" value={dateNaissance} style={styles.input} />
          <TextInput placeholder="Adresse" value={lieuNaissance} style={styles.input} />
          <TextInput placeholder="Numéro CIN" value={numeroCIN} style={styles.input} />
          <TextInput placeholder="Date d'expiration" value={dateExpiration} style={styles.input} />
        </>
      );
      case 'Passport':
        return (
        <>
          <Animated.Text style={{ ...styles.documentTypeHeader, opacity: fadeAnim }}>
              Passeport
            </Animated.Text>
          <TextInput placeholder="Numérp de passeport" value={numPass} style={styles.input} />
          <TextInput placeholder="Type" value={TypePass} style={styles.input} />
          <TextInput placeholder="Code" value={codePass} style={styles.input} />
          <TextInput placeholder="Nom" value={nom} style={styles.input} />
          <TextInput placeholder="Prénom" value={prenom} style={styles.input} />
          <TextInput placeholder="Date de naissance" value={dateNaissance} style={styles.input} />
          <TextInput placeholder="Lieu de naissance" value={lieuNaissance} style={styles.input} />
          <TextInput placeholder="Sexe" value={sexe} style={styles.input} />
          <TextInput placeholder="Adresse" value={adresse} style={styles.input} />
          <TextInput placeholder="Autorité" value={autorite} style={styles.input} />
          <TextInput placeholder="Date de délivrance" value={dateDelivrance} style={styles.input} />
          <TextInput placeholder="Date d'expiration" value={dateExpiration} style={styles.input} />
        </>
     );
     
     case 'Driving License':
      return (
        <>
          <Animated.Text style={{ ...styles.documentTypeHeader, opacity: fadeAnim }}>
              Permis De Conduite
            </Animated.Text>
          <TextInput placeholder="Numéro de permis" value={numeroCIN} style={styles.input} />

          
          <TextInput placeholder="Nom"value={name} style={styles.input} />
          <TextInput placeholder="Nom complet" value={nom} style={styles.input} />
          <TextInput placeholder="Prénom"value={prenom} style={styles.input} />
          <TextInput placeholder="Date de naissance" value={dateNaissance} style={styles.input} />
          <TextInput placeholder="Lieu de naissance" value={lieuNaissance} style={styles.input} />
          <TextInput placeholder="Code" value={codePass} style={styles.input} />
          <TextInput placeholder="Type de permis" value={typePermis} style={styles.input} />
          <TextInput placeholder="lieu de délivrance" value={delivrance} style={styles.input} />
          <TextInput placeholder="Date de délivrance" value={delivranceDate} style={styles.input} />
          

          
        </>
       );
       default:
         return null;
     }
   };

  const getContentToShare = () => {
    switch (detectedDocumentType) {
      case 'Identity Card':
        return `Carte d'identité nationale:\nNom: ${nom}\nPrénom: ${prenom}\nDate de naissance: ${dateNaissance}\nAdresse: ${adresse}\nNuméro CIN: ${numeroCIN}\nDate d'expiration: ${dateExpiration}`;
      case 'Passport':
        return `Passeport:\nNuméro de passeport: ${numPass}\nType: ${TypePass}\nCode: ${codePass}\nNom: ${nom}\nPrénom: ${prenom}\nDate de naissance: ${dateNaissance}\nLieu de naissance: ${lieuNaissance}\nSexe: ${sexe}\nAdresse: ${adresse}\nAutorité: ${autorite}\nDate de délivrance: ${dateDelivrance}\nDate d'expiration: ${dateExpiration}`;
      case 'Driving License':
        return `Permis de conduite:\nNuméro de permis: ${numeroCIN}\nNom: ${name}\nNom complet: ${nom}\nPrénom: ${prenom}\nDate de naissance: ${dateNaissance}\nLieu de naissance: ${lieuNaissance}\nCode: ${codePass}\nType de permis: ${typePermis}\nLieu de délivrance: ${delivrance}\nDate de délivrance: ${delivranceDate}`;
      default:
        return 'Aucun document sélectionné.';
    }
  };
  
  const shareContent = () => {
    const contentToShare = getContentToShare();
    const shareOptions = {
      title: 'Partager via',
      message: contentToShare,
    };
  
    Share.share(shareOptions)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
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
          {renderAdditionalFields()}

          <TouchableOpacity onPress={pickImageFromGallery} style={styles.button}>
            <Text style={styles.buttonText}>Importer depuis la galerie</Text>
            <FontAwesome name="photo" size={20} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>Prendre une photo</Text>
            <Feather name="camera" size={20} color="white" style={styles.icon} />
          </TouchableOpacity>

          {selectedImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.selectedText}>Image sélectionnée :</Text>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            </View>
          )}
          {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00539C" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          
          <TouchableOpacity onPress={uploadImage} style={styles.button}>
            <Text style={styles.buttonText}>Uploader l'image</Text>
            <Feather name="upload" size={20} color="white" style={styles.icon} />

          </TouchableOpacity>
          
      )}
      {/* Bouton pour réinitialiser les champs */}
      <TouchableOpacity onPress={resetFields} style={styles.button}>
        <Text style={styles.buttonText}>Vider les champs</Text>
        {/* Vous pouvez ajouter une icône ici si nécessaire */}
      </TouchableOpacity>
      <TouchableOpacity onPress={shareContent} style={styles.button}>
        <Text style={styles.buttonText}>Partager les informations</Text>
      </TouchableOpacity>

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
  documentTypeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366', // Par exemple, un bleu foncé
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 20,
    color: '#003366',
    marginBottom:10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00539C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    minWidth: 320,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  icon: {
    marginLeft: 10, // Ajoutez un espace entre le texte et l'icône
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
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#00539C',
  },
});

export default AccueilPage;