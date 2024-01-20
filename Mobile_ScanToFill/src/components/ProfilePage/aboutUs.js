import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Image
          source={require('../../../assets/stf1.png')}
          style={styles.logo}
        />
      <Text style={styles.title}>
      Chez 'Scan to Fill', notre mission est de simplifier la vie numérique de nos utilisateurs. 
      </Text>
      <Text style={styles.title}>
      Notre application révolutionnaire est conçue pour transformer la façon dont vous interagissez avec les documents et les images. Dotée d'une technologie de pointe de reconnaissance optique de caractères (OCR), elle permet de scanner n'importe quelle photo ou document et d'en extraire instantanément les données pertinentes. Que ce soit une carte d'identité nationale, un permis de conduire ou tout autre document officiel, notre application identifie et extrait avec précision les informations.
      </Text>
      <Text style={styles.title}>
      Notre engagement est de vous fournir un outil fiable, rapide et sécurisé, qui non seulement économise votre temps mais garantit aussi la précision et la confidentialité de vos données.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centrer le contenu verticalement
    backgroundColor: 'white', // Couleur de fond légère
    padding: 22, // Espacement autour du contenu
  },
  title: {
    fontSize: 16, // Taille de police adaptée
    //lineHeight: 24, // Hauteur de ligne pour une meilleure lisibilité
    color: '#333', // Couleur de texte standard
    textAlign: 'justify', // Justifier le texte pour une présentation uniforme
    marginBottom: 20, // Marge en bas pour l'espacement
    marginStart:12,
    marginEnd:12,
  },
  logo:{
    width: 130,
    height: 136,
    marginBottom:20,
    marginTop: -85,
    },
});

export default AboutUs;
