import 'react-native-gesture-handler';

import React from 'react';
import EmailScreen from './src/screens/EmailScreen';
import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import AddTripDatesScreen from './src/screens/AddTripDatesScreen';
import AddTripDescScreen from './src/screens/AddTripDescScreen';
import AddTripImagesScreen from './src/screens/AddTripImagesScreen';
import AddTripPiceScreen from './src/screens/AddTripPiceScreen';
import AdminTrips from './src/screens/AdminTrips';
import AgentInfoScreen from './src/screens/AgentInfoScreen';
import AgentProfileScreen from './src/screens/AgentProfileScreen';
import AgentsScreen from './src/screens/AgentsScreen';
import BookingDoneScreen from './src/screens/BookingDoneScreen';
import BookScreen from './src/screens/BookScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import MembersDetailScreen from './src/screens/MembersDetailScreen';
import OwnerInfoScreen from './src/screens/OwnerInfoScreen';
import PostTripScreen from './src/screens/PostTripScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignInScreen from './src/screens/SignInScreen';
import TripDetailScreen from './src/screens/TripDetailScreen';
import TripPostedScreen from './src/screens/TripPostedScreen';
import TripsScreen from './src/screens/TripsScreen';
import UpgradeAccountScreen from './src/screens/UpgradeAccountScreen';
import RequestTripScreen from './src/screens/RequestTripScreen';
import TrpisHistoryScreen from './src/screens/TrpisHistoryScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AgentBookingScreen from './src/screens/AgentBookingScreen';
import AdminHome from './src/screens/admin/AdminHome';
import AllTripsScreen from './src/screens/admin/AllTripsScreen';
import AdminTripDetails from './src/screens/admin/AdminTripDetails';
import UserProfileScreen from './src/screens/admin/UserProfileScreen';
import AllUsersScreen from './src/screens/admin/AllUsersScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createSharedElementStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const LoginStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Email" component={EmailScreen} />
    <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);
export const AdminStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={AdminHome} />
    <Stack.Screen name="All Trips" component={AllTripsScreen} />
    <Stack.Screen name="Trips Details" component={AdminTripDetails} />
    <Stack.Screen name="TripDetails" component={AdminTripDetails} />
    <Stack.Screen name="User Profile" component={UserProfileScreen} />
    <Stack.Screen name="Agents Screen" component={AgentsScreen} />
    <Stack.Screen name="Agent Profile" component={AgentProfileScreen} />
    <Stack.Screen name="All Users" component={AllUsersScreen} />
  </Stack.Navigator>
);

export const MainStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    {/* <Stack.Group
      screenOptions={{
        // gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}> */}
    {/* <Stack.Screen
      name="Splash"
      options={{...TransitionPresets.SlideFromRightIOS}}
      component={SplashScreen}
    /> */}
    <Stack.Screen
      name="Homescreen"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={HomeScreen}
    />
    <Stack.Screen
      name="Locations"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={LocationsScreen}
    />
    <Stack.Screen
      name="Trips"
      options={{ ...TransitionPresets.SlideFromRightIOS, gestureEnabled: true }}
      component={TripsScreen}
    />
    <Stack.Screen
      name="TripDetails"
      options={{ ...TransitionPresets.SlideFromRightIOS, gestureEnabled: true }}
      component={TripDetailScreen}
    />
    <Stack.Screen
      name="Book"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={BookScreen}
    />
    <Stack.Screen
      name="Members"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={MembersDetailScreen}
    />
    <Stack.Screen
      name="Owner Info"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={OwnerInfoScreen}
    />
    <Stack.Screen
      name="Agents"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AgentsScreen}
    />
    <Stack.Screen
      name="Agent Profile"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AgentProfileScreen}
    />
    <Stack.Screen
      name="Post Trip"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={PostTripScreen}
    />
    <Stack.Screen
      name="Trip Images"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AddTripImagesScreen}
    />
    <Stack.Screen
      name="Trip Dates"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AddTripDatesScreen}
    />
    <Stack.Screen
      name="Trip Desc"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AddTripDescScreen}
    />
    <Stack.Screen
      name="Request Trip"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={RequestTripScreen}
    />
    <Stack.Screen
      name="Trips History"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={TrpisHistoryScreen}
    />
    <Stack.Screen
      name="Favorites Screen"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={FavoritesScreen}
    />
    <Stack.Screen
      name="Agent Booking"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AgentBookingScreen}
    />
    <Stack.Screen
      name="Trip Price"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AddTripPiceScreen}
    />
    <Stack.Screen
      name="Admin Trips"
      options={{ ...TransitionPresets.SlideFromRightIOS }}
      component={AdminTrips}
    />
    <Stack.Screen
      name="Upgrade"
      options={{
        presentation: 'modal',
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={UpgradeAccountScreen}
    />
    <Stack.Screen
      name="Trip Posted"
      options={{
        presentation: 'modal',
        gestureEnabled: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={TripPostedScreen}
    />
    <Stack.Screen
      name="Booked"
      options={{
        presentation: 'transparentModal',
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={BookingDoneScreen}
    />

    <Stack.Screen
      name="Profile"
      options={{
        presentation: 'modal',
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={ProfileScreen}
    />
    <Stack.Screen
      name="Settings"
      options={{
        presentation: 'modal',
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={SettingsScreen}
    />
    <Stack.Screen
      name="Agent Info"
      options={{
        presentation: 'modal',
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      component={AgentInfoScreen}
    />
  </Stack.Navigator>
);
