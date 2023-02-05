import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '../assets/Icons/Ionicons';

const BookingDoneScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Homescreen');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#013237',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ alignSelf: 'center' }}>
        <Ionicons name="checkmark" size={180} color="white" />
      </View>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Booking Done
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Your booking has been done successfully
        </Text>
      </View>
    </View>
  );
};

export default BookingDoneScreen;

const styles = StyleSheet.create({});
