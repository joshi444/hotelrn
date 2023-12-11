import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Rooms from './Room';
import { Header } from '@react-navigation/stack';
import Navbar from './Header';




function Hotels() {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

 

  useEffect(() => {
    axios
  .get('https://localhost:44397/api/Hotel')
  .then((response) => {
    setHotels(response.data);
  })
  .catch((error) => {
    console.log('Error fetching hotels:', error);
  });

  }, []);

  const handleHotelSelect = (hotelId) => {
    // setSelectedHotel(selectedHotel === hotelId ? null : hotelId);
    // const selected = hotels.find((hotel) => hotel.hotelId === hotelId);
    navigation.navigate('Rooms', { hotelId: hotelId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.hotelCard,
        { backgroundColor: selectedHotel === item.hotelId ? '#ccc' : '#fff' },
      ]}
      onPress={() => handleHotelSelect(item.hotelId)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.hotelImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text>Name: {item.hotelName}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.hotelId.toString();

  const getItemLayout = (_, index) => ({
    length: 240, // Height of each row (including margin and padding)
    offset: 240 * index,
    index,
  });

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Navbar/>
    <View style={styles.container}>
      <TextInput
        placeholder="Search by location..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredHotels}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={4} // Adjust this number based on performance needs
      />
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e43c4',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 8,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
  },
  hotelCard: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  hotelImage: {
    height: 200,
    aspectRatio: 16 / 9,
  },
  cardContent: {
    padding: 12,
  },
});

export default Hotels;
