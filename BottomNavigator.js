import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper'; // Assuming you're using Paper for icons
import Hotels from './hotel';
import Rooms from './Room';
import MyBookings from './MyBookings';
import Profile from './Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Hotels"
        component={HotelStackNavigator}
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Bookings"
        component={MyBookings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HotelStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotels"  component={Hotels}  options={{ headerShown: false }}/>
      <Stack.Screen name="Rooms" component={Rooms} />
    </Stack.Navigator>
  );
}

export default BottomTabNavigator;