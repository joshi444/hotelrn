import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt, faSignOutAlt, faAddressBook, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navbar = () => {
  const navigation = useNavigation();
  const [showFields, setShowFields] = useState(false);
  const user = true; // You can replace this with your user authentication logic

  const toggleFields = () => {
    setShowFields(!showFields);
  };

 

  const handleLogout = async  () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      // Navigate to the main page or login screen
      navigation.navigate('login'); 
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFields} style={styles.toggleIcon}>
          <FontAwesomeIcon icon={faBars} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.logoText}>BookMyRoom</Text>
      </View>
      {showFields && (
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Hotels')} style={styles.navItem}>
            <Text style={styles.navText}>Hotels</Text>
          </TouchableOpacity>
          {user ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navItem}>
                <Text style={styles.navText}>My Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('mybooking')} style={styles.navItem}>
                <Text style={styles.navText}>My Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.navItem}>
                <Text style={styles.navText}>
                  <FontAwesomeIcon icon={faSignOutAlt}  color='white'/> Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.navItem}>
                <Text style={styles.navText}>
                  <FontAwesomeIcon icon={faAddressBook} /> Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.navItem}>
                <Text style={styles.navText}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom:10
  },
  toggleIcon: {
    zIndex: 1,
  },
  navContainer: {
    marginTop: 20,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    color: 'white',
  },
});

export default Navbar;
