import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '../assets/Icons/Ionicons';

const BackButton = () => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => Navigation.goBack()}>
      <Ionicons name="ios-arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
