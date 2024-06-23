import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Text, TextInput, useTheme} from 'react-native-paper';

const ProfileScreen = () => {
  const {colors} = useTheme();
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  const handleSaveProfile = () => {
    // Logic to save profile changes
    console.log('Profile saved');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={{uri: user.profilePicture}}
          style={{backgroundColor: colors.primary}}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={styles.profileDetails}>
        <TextInput
          theme={{colors: {primary: '#84251E'}}}
          label="Name"
          value={user.name}
          onChangeText={name => setUser({...user, name})}
          style={styles.input}
        />
        <TextInput
          theme={{colors: {primary: '#84251E'}}}
          label="Email"
          value={user.email}
          onChangeText={email => setUser({...user, email})}
          style={styles.input}
          disabled
        />
        <Button
          theme={{colors: {primary: '#84251E'}}}
          mode="contained"
          onPress={handleSaveProfile}
          style={styles.saveButton}>
          Save Profile
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
