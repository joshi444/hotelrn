import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserProfile() {
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

  if (!user) {
    return (
      <View style={styles.container}>
        {/* You might want to render a loading indicator or a message here */}
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        <View style={styles.userCard}>
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.cardDetails}>
            <Text style={styles.label}>NAME:</Text>
            <Text style={styles.value}>{user.userName}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.label}>EMAIL:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.label}>PHONE:</Text>
            <Text style={styles.value}>{user.contactNo}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e43c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    maxWidth: 400,
    width: '100%',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    height: 200,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  cardDetails: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#000',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    // Style for user values
  },
});

export default UserProfile;
