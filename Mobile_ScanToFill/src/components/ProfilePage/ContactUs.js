import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Choisissez l'ensemble d'icônes de votre choix

const ContactUsScreen = () => {

  const phoneNumber = '+212640414243';
  const emailAddress = 'ScanToFill@gmail.ma';

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactez-nous</Text>
      <Text style={styles.text}>
      Chez 'Scan to Fill', nous accordons une grande importance à la communication avec nos utilisateurs. Votre expérience avec notre application est primordiale, et nous sommes là pour vous assister à chaque étape. Si vous avez des questions, des suggestions, ou si vous rencontrez des problèmes avec notre application, n'hésitez pas à nous contacter.
      </Text>
      <Text style={styles.text}>
      Votre feedback est essentiel pour nous aider à améliorer continuellement notre service et à garantir la meilleure expérience utilisateur possible.
      </Text>
      <TouchableOpacity style={styles.contactInfo} onPress={handlePhonePress}>
        <Icon name="phone" size={24} color="#003366" />
        <Text style={styles.contactText}>{phoneNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactInfo} onPress={handleEmailPress}>
        <Icon name="envelope" size={24} color="#003366" />
        <Text style={styles.contactText}>{emailAddress}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginTop: 90,
    color: '#003366',
  },
  text: {
    fontSize: 17,
    textAlign: 'justify',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  contactInfo: {
    marginLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ContactUsScreen;
