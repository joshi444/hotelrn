import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper'; // Assuming you're using Paper for icons
import Hotels from './hotel';
import Rooms from './Room';
import BottomTabNavigator from './BottomNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Header from './Header';
import Register from './Register';
import Booking from './Booking';
import UserBooking from './MyBookings';
import UserProfile from './MyProfile';



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
     <Stack.Screen name="Hotels"  component={Hotels}  options={{ headerShown: false }}/>
     <Stack.Screen name="Rooms" component={Rooms} />
     <Stack.Screen name='Booking' component={Booking} />
     <Stack.Screen name = "mybooking" component={UserBooking} />
     <Stack.Screen name="UserProfile" component = {UserProfile} />
     </Stack.Navigator>
    
    </NavigationContainer>
  );
}

