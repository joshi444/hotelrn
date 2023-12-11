import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

function Rooms() {
  const navigation = useNavigation();
  const route = useRoute();
  const [rooms, setRooms] = useState([]);
  const { hotelId } = route.params;

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Room/${hotelId}`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => console.log(error));
  }, [hotelId]);

  const handleRoomSelection = (roomId, availableRooms) => {
    if (availableRooms > 0) {
      navigation.navigate('Booking', {
        hotelId: hotelId,
        roomId: roomId,
      });
    } else {
      // Room is not available
      // You can display an alert or message here
      alert("no rooms available");
      
      console.log('Room not available');
    }
  };

  return (
    <View style={styles.roomsContainer}>
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.roomsList}>
            {rooms.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={styles.roomCard}
                onPress={() => handleRoomSelection(data.roomId, data.avalaibleRooms)}>
                <Image
                  source={{ uri: data.imageUrl }}
                  style={styles.roomImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text>Type: {data.roomType}</Text>
                  <Text>Price: {data.price}</Text>
                  <Text>Available Rooms: {data.avalaibleRooms}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  roomsList: {
    width: '100%',
  },
  roomCard: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  roomImage: {
    height: 200,
    aspectRatio: 16 / 9,
  },
  cardContent: {
    padding: 12,
  },
});

export default Rooms;
