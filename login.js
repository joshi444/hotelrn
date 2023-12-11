import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async () => {
    try {
      const loginResponse = await axios.get(`https://localhost:44397/api/User/${loginData.email},${loginData.password}`);
      await AsyncStorage.setItem('user', JSON.stringify(loginResponse.data));
      if (loginData.email === 'admin@gmail.com' && loginData.password === 'Admin@123') {
        Alert.alert('Login successful');
        
      } else {
        Alert.alert('Login successful');
        
        navigation.navigate('Hotels');
      }
    } catch (error) {
      Alert.alert('Login failed');
      console.error('Login failed:', error);
    }
  };

  const handleRegister = () => {
    // Navigate to registration screen or any other desired route for user registration
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookMyRoom</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.inputContainer}>
          <Text>Email address</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleLoginChange('email', value)}
            value={loginData.email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleLoginChange('password', value)}
            value={loginData.password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>New User? Register Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #4e54c8, #8f94fb)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  card: {
    padding: 20,
    backgroundColor: '#f7f1e3',
    width: '80%',
    borderRadius: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4e54c8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:30
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#4e54c8',
    fontSize:25
  },
});

export default Login;
