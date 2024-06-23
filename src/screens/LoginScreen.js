import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple login validation (for demonstration purposes)
    if (username === '123' && password === '123') {
      Alert.alert('Login Successful');
      // Navigate to another screen if needed
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Savorr.png')} // Add your own image in the assets folder
        style={styles.image}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
        theme={{colors: {primary: '#84251E'}}}
      />
      <TextInput
        type="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        mode="outlined"
        theme={{colors: {primary: '#84251E'}}}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={handleLogin}
        buttonColor="#84251E">
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF2D5',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#84251E',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#84251E',

    marginBottom: 12,

    width: '100%', // Make the input fields take up the full width
  },
});
