import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '../assets/Icons/MaterialIcons';
import UserIcon from './UserIcon';

const AgentRowItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Agent Profile', { agent: item })}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <UserIcon name={item.company.name} size={50} image={item.image} />
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            {item.company.name}
          </Text>
          <Text style={{ color: 'black', fontSize: 16 }}>
            {item.company.address}
          </Text>
        </View>
      </View>
      <View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default AgentRowItem;
