import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '../assets/Icons/AntDesign';

const SettingsRowItem = ({ name, icon, onPress }) => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20,
      }}>
      <AntDesign name={icon} size={24} color="black" />
      <Text style={{ color: 'black', marginLeft: 10, fontSize: 16 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingsRowItem;
