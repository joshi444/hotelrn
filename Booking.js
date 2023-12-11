import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function BookingForm() {
  const route = useRoute();
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date().toISOString().split('T')[0]);
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } 
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const { hotelId, roomId } = route.params;

  const handleSubmit = async () => {
    setBookingError(null);

    try {
      const response = await axios.post('https://localhost:44397/api/Booking', {
        userId: user && user.userId, // Check if user and user.userId exist
        roomId,
        hotelId,
        checkInDate,
        checkOutDate,
        noOfPeople: parseInt(numberOfPeople),
      });

      console.log('Booking successful:', response.data);
      // Additional logic after successful booking (e.g., redirect, display confirmation message)
    } catch (error) {
      setBookingError('Failed to book. Please try again.');
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Booking Form</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Check-in Date:</Text>
          <TextInput
            style={styles.input}
            type="date" // Date input is not available in React Native, consider using a Date Picker component
            value={checkInDate}
            onChangeText={setCheckInDate}
          
            required
          />
          <Text style={styles.label}>Check-out Date:</Text>
          <TextInput
            style={styles.input}
            type="date" // Similar to above, use a Date Picker component
            value={checkOutDate}
            onChangeText={setCheckOutDate}
            required
          />
          <Text style={styles.label}>Number of People:</Text>
          <TextInput
            style={styles.input}
            type="number" // Use a Numeric Keyboard
            value={numberOfPeople}
            onChangeText={setNumberOfPeople}
            required
          />
          {bookingError && <Text style={styles.errorText}>{bookingError}</Text>}
          <Button title="Book" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6e43c4',
  },
  card: {
    maxWidth: 400,
    margin: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default BookingForm;
