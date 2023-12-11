import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    contactNo: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    contactNo: '',
    email: '',
  });

  const validatePassword = (value) => {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return alphanumericRegex.test(value);
  };

  const validateContactNo = (value) => {
    const contactNoRegex = /^\d{10}$/;
    return contactNoRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value) ? '' : 'Password should be alphanumeric and at least 6 characters long.',
      }));
    } else if (name === 'contactNo') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNo: validateContactNo(value) ? '' : 'Contact number should be 10 digits long.',
      }));
    } else if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? '' : 'Invalid email address.',
      }));
    }
  };

  const handleSubmit = async () => {
    if (errors.password || errors.contactNo || errors.email) {
      console.log('Validation failed. Please fix the errors before submitting.');
      return;
    }

    console.log(formData)

    try {
     
      const apiUrl = 'https://localhost:44397/api/User';

      const response = await axios.post(apiUrl, formData);

      console.log('Registration successful:', response.data);
      Alert.alert('Registration successful');
      navigation.navigate('login'); 
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for Hotel Booking</Text>
      <View style={styles.card}>
        <TextInput
          style={[styles.input, errors.userName && styles.inputError]}
          placeholder="Full Name"
          onChangeText={(value) => handleChange('userName', value)}
          value={formData.userName}
        />
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          onChangeText={(value) => handleChange('password', value)}
          value={formData.password}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <TextInput
          style={[styles.input, errors.contactNo && styles.inputError]}
          placeholder="Contact Number"
          onChangeText={(value) => handleChange('contactNo', value)}
          value={formData.contactNo}
          keyboardType="phone-pad"
        />
        {errors.contactNo && <Text style={styles.errorText}>{errors.contactNo}</Text>}
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email address"
          onChangeText={(value) => handleChange('email', value)}
          value={formData.email}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  card: {
    padding: 20,
    width: '80%',
    backgroundColor: '#f7f1e3',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4e54c8',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;
