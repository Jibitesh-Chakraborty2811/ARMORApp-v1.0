import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');

  
  const handleLogin = async () => {
    try
    {
      console.log(userId);
      console.log(pin);
      const response = await axios.post(`http://192.168.72.187:5000/login/${userId}/${pin}`);
      if (response.status === 200) {
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('pin', pin);
        onLoginSuccess();
        navigation.navigate('Auth');
      } else {
        Alert.alert('Error', 'Incorrect User ID or PIN');
      }
    }catch(error)
    {
      Alert.alert(error.message);
    }
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />
      <TextInput
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
