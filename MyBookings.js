import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import jsPDF from 'jspdf';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserBooking() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState({});
  const [rooms, setRooms] = useState({});

  const fetchData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.userId);

      const response = await axios.get(`https://localhost:44397/api/Booking/${parsedUser.userId}`);
      const bookingData = response.data;
      setBookings(bookingData);

      const hotelIds = bookingData.map((booking) => booking.hotelId);
      const roomIds = bookingData.map((booking) => booking.roomId);

      const hotelResponse = await axios.get(`https://localhost:44397/api/Hotel?ids=${hotelIds.join(',')}`);
      const hotelData = hotelResponse.data.reduce((acc, hotel) => {
        acc[hotel.hotelId] = hotel;
        return acc;
      }, {});
      setHotels(hotelData);

      const roomResponse = await axios.get(`https://localhost:44397/api/Room?ids=${roomIds.join(',')}`);
      const roomData = roomResponse.data.reduce((acc, room) => {
        acc[room.roomId] = room;
        return acc;
      }, {});
      setRooms(roomData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return numberOfDays;
  };

  const calculateTotalCost = (booking) => {
    const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
    return numberOfDays * booking.costPerNight;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const result = await axios.delete(`https://localhost:44397/api/Booking/${id}`);
        if (result.status === 200) {
          showMessage({
            message: 'Booking cancelled successfully',
            type: 'success',
          });
          fetchData();
        }
      } catch (error) {
        showMessage({
          message: `Error: ${error.response.data}`,
          type: 'danger',
        });
      }
    }
  };

  const downloadBill = (booking) => {
    try {
      const pdf = new jsPDF();

      pdf.text('Your Company Name', 105, 15, 'center');
      pdf.setDrawColor(0);
      pdf.setFillColor(200, 200, 200);
      pdf.rect(10, 10, 190, 10, 'F');

      pdf.text("Invoice", 10, 30);
        pdf.text(`Booking ID: ${booking.bookingId}`, 10, 40);
        pdf.text(`Room Type: ${rooms[booking.roomId]?.roomType || "N/A"}`, 10, 50);
        pdf.text(`Hotel Name: ${hotels[booking.hotelId]?.hotelName || "N/A"}`, 10, 60);
        pdf.text(`Location: ${hotels[booking.hotelId]?.location || "N/A"}`, 10, 70);
        pdf.text(`Check-In Date: ${formatDate(booking.checkInDate)}`, 10, 80);
        pdf.text(`Check-Out Date: ${formatDate(booking.checkOutDate)}`, 10, 90);
        pdf.text(`No of People: ${booking.noOfPeople}`, 10, 100);
    
        const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
        pdf.text(`No of Days: ${numberOfDays} day(s)`, 10, 110);
        pdf.text(`Cost per day: ${rooms[booking.roomId]?.price.toFixed(2) || "N/A"}`, 10, 120);
    
        // Calculate and display the total cost (assuming you have cost data)
        const totalCost = numberOfDays * rooms[booking.roomId]?.price;
        pdf.text(`Total Cost: ${totalCost.toFixed(2)}`, 10, 130);
    
        // Add a footer with the page number
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.text(`Page ${i} of ${pageCount}`, 190, pdf.internal.pageSize.height - 10);
        }

      pdf.save(`bill_${booking.bookingId}.pdf`);
    } catch (error) {
      console.error('Error generating or downloading the bill:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#6e43c4', flex: 1 }}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.bookingId.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 10, padding: 10, backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Room Type: {rooms[item.roomId]?.roomType || 'N/A'}</Text>
            <Text>Hotel Name: {hotels[item.hotelId]?.hotelName || 'N/A'}</Text>
            <Text>Check-In Date: {formatDate(item.checkInDate)}</Text>
            <Text>Check-Out Date: {formatDate(item.checkOutDate)}</Text>
            <Text>No of People: {item.noOfPeople}</Text>
            <Button title="Download Bill" onPress={() => downloadBill(item)} />
            <br></br>
            <Button title="Cancel" onPress={() => handleDelete(item.bookingId)} />
          </View>
        )}
      />
    </View>
  );
}

export default UserBooking;
