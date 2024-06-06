import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Savorr.png')} // Add your own image in the assets folder
        style={styles.image}
      />

      <Text style={styles.title}>
        Welcome to Food Recipes
        <MaterialIcon name="zoom-in" size={24} />
      </Text>
      <Text style={styles.subtitle}>
        Discover and share the best recipes!
        <EntypoIcon name="video-camera" size={30} />
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
        labelStyle={{color: 'white', fontWeight: 'bold'}}
        buttonColor="#84251E">
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2D5',
    padding: 20,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10, // Set border radius
    paddingVertical: 10, // Set vertical padding
  },
});

export default WelcomeScreen;
