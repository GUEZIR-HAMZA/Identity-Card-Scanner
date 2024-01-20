import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import {SimpleLineIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const editProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const aboutUs = () => {
    navigation.navigate('About Us');
  };
  const editPswd = () => {
    navigation.navigate('EditMdp');
  };
  const contactUs = () => {
    navigation.navigate('ContactUs');
  };
  const deconnexion = () => {
    navigation.navigate('Authentication');
  };

  return (
    <View style={styles.container}>
       
      <Text style={styles.title}>compte</Text>
      <View style={styles.contentContainer}>
        {/* Image à gauche */}
        <Image
          source={require('../../../assets/ana2.jpg')} 
          style={styles.profilePhoto}
        />

        {/* Données à droite */}
        <View style={styles.dataContainer}>
          <Text style={styles.profileName}>Ines</Text>
          <Text style={styles.addressText}>elmehdiines@gmail.com</Text>
        </View>
      </View>

      {/* Bouton pour enregistrer la biographie */}
      <TouchableOpacity onPress={editProfile} style={styles.editProfileButton}>
        <View style={styles.buttonContent}>
          <AntDesign name="user" size={24}  color="#003366" />
          <Text style={styles.editProfileText}>Modifier mon profile</Text>
        </View>
      </TouchableOpacity>

      {/* Favoris */}
      <TouchableOpacity onPress={aboutUs} style={styles.listFollowingArea}>
        <View style={styles.Content}>
          <Text style={styles.listFollowingText}>About Us</Text>
          <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      {/* Changer mdp */}
      <TouchableOpacity onPress={editPswd} style={styles.listFollowingArea}>
        <View style={styles.Content}>
          <Text style={styles.listFollowingText}>Changer mot de passe</Text>
          <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      {/* Contacter ns */}
      <TouchableOpacity onPress={contactUs} style={styles.listFollowingArea}>
        <View style={styles.Content}>
          <Text style={styles.listFollowingText}>Contactez-nous</Text>
          <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
        </View>
      </TouchableOpacity>
      {/* btn de déconnexion*/}
      <TouchableOpacity onPress={deconnexion} style={styles.deconnexionButton}>
        <View style={styles.buttonContent}>
          <SimpleLineIcons name="logout" size={24} color="red" />
          <Text style={styles.logOutText}>Deconnexion</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title:{
    fontSize: 21,
    marginTop:40,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop:30,
    padding: 20,
  },
  profilePhoto: {
    width: 90,
    height: 90,
    marginRight:20,
    borderRadius: 15,
    borderWidth: 1.3,
    borderColor: '#003366',
    borderRadius: 5,
  },
  dataContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  contactPost: {
    fontSize: 16,
    color: 'grey',
  },
  addressText: {
    fontSize: 16,
    color: 'grey',
  },
  editProfileButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    minHeight: 30,
    minWidth: 345,
    borderWidth: 1,
    borderColor: '#003366',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 40,
  }
  ,buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  editProfileText: {
    color: '#003366',
    fontSize: 17,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:7,
  },
  
  listFollowingArea:{
    minHeight: 30,
    minWidth: 345,
  },
  Content: {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listFollowingText:{
    fontSize: 16,
    marginLeft:10,
    
  },
  icon:{
    fontSize:28,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    width:"90%",
    alignSelf: 'center',
    backgroundColor: '#ccc',
    marginBottom: 15,
    marginTop:10
  },
  deconnexionButton: {
    backgroundColor: 'pink',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    minHeight: 30,
    minWidth: 345,
    borderRadius: 10,
    padding: 15,
    marginTop: 150,
  },
  logOutText:{
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:7,
  }
});

export default ProfileScreen;
