import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '../assets/Icons/Ionicons';

const TripPostedScreen = ({ navigation }) => {
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
          Trip Posted
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Your trip has been posted successfully
        </Text>
      </View>
    </View>
  );
};

export default TripPostedScreen;

const styles = StyleSheet.create({});
